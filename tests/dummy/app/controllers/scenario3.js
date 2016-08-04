import Ember from 'ember';

export default Ember.Controller.extend({
  activePage: null,
  cycleIsEnabled: false,
  cycleInterval: null,
  pages: null,
  report: null,

  actions: {
    onEmbedded(report) {
      console.log(`Coponent was embedded: `, report);

      this.set('report', report);

      report.on('loaded', () => {
        report.getPages()
          .then(pages => {
            this.set('pages', pages);
            if (pages.length > 0) {
              this.set('activePage', pages[0]);
            }
          });
      });

      report.on('pageChanged', event => {
        const page = event.detail.newPage;
        this.set('activePage', page);
      });
    },

    cyclePageClicked() {
      console.log('cyclePageClicked');
      this.toggleCycle();
    },

    nextPageClicked() {
      console.log('nextPageClicked');
      this.changePage(true);
    },

    pageClicked(page) {
      console.log('pageClicked', page);
      page.setActive();
    },

    previousPageClicked() {
      console.log('previousPageClicked');
      this.changePage(false);
    }
  },

  changePage(forwards = false) {
    let activePageIndex = -1;
    this.get('pages')
      .some((page, i) => {
        if (page.name === this.get('activePage.name')) {
          activePageIndex = i;
          return true;
        }
      });

    if (forwards) {
      activePageIndex += 1;
    }
    else {
      activePageIndex -= 1;
    }

    if (activePageIndex > this.pages.length - 1) {
      activePageIndex = 0;
    }
    if (activePageIndex < 0) {
      activePageIndex = this.pages.length - 1;
    }

    this.pages
      .some((page, i) => {
        if (activePageIndex === i) {
          page.setActive();
          return true;
        }
      });
  },

  toggleCycle() {
    function togglePage() {
      this.set('cycleInterval', Ember.run.later(this, () => {
        console.log('interval called');
        this.changePage(true);
        togglePage.call(this);
      }, 2000));
    }

    if (this.get('cycleIsEnabled')) {
      this.set('cycleIsEnabled', false);
      Ember.run.cancel(this.cycleInterval);
    }
    else {
      this.set('cycleIsEnabled', true);

      togglePage.call(this);
    }
  }
});
