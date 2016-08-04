import Ember from 'ember';
import layout from '../templates/components/powerbi-filter-pane';
import pbi from 'powerbi-client';

export default Ember.Component.extend({
  layout,

  reportTargets: [
    "Report",
    "Page",
    "Visual"
  ],
  selectedReportTarget: null,

  page: null,
  selectedPage: null,

  targetTypes: [
    'Column',
    'Hierarchy',
    'Measure'
  ],
  selectedTargetType: null,

  filterTypes: [
    'Basic',
    'Advanced'
  ],
  selectedFilterType: null,

  basicOperators: [
    'In',
    'NotIn'
  ],
  selectedBasicOperator: null,

  logicalOperators: [
    'And',
    'Or'
  ],
  selectedLogicalOperator: null,

  value1: null,
  value2: null,

  conditionalOperators: [
    'None',
    'LessThan',
    'LessThanOrEqual',
    'GreaterThan',
    'GreaterThanOrEqual',
    'Contains',
    'DoesNotContain',
    'StartsWith',
    'DoesNotStartWith',
    'Is',
    'IsNot',
    'IsBlank',
    'IsNotBlank'
  ],
  valueA: null,
  conditionalOperatorA: null,
  valueB: null,
  conditionalOperatorB: null,

  table: null,
  column: null,
  hierarchy: null,
  hierarchyLevel: null,
  measure: null,

  init() {
    this._super();
    this.set('selectedReportTarget', this.get('reportTargets')[0]);
    this.set('selectedPage', this.get('pages.firstObject'));
    this.set('selectedTargetType', this.get('targetTypes.firstObject'));
    this.set('selectedFilterType', this.get('filterTypes')[0]);
    this.set('selectedBasicOperator', this.get('basicOperators.firstObject'));
    this.set('selectedLogicalOperator', this.get('logicalOperators.firstObject'));
  },


  actions: {
    onSubmit() {
      const data = {
        target: this.getFilterTypeTarget(),
        operator: this.getFilterOperatorAndValues(),
        filterable: this.getFilterableTarget()
      };

      let filter;
      if (data.operator.type === "Basic") {
        filter = new pbi.models.BasicFilter(data.target, data.operator.operator, data.operator.values);
      }
      else if (data.operator.type === "Advanced") {
        filter = new pbi.models.AdvancedFilter(data.target, data.operator.logicalOperator, data.operator.conditions);
      }

      this.get('onAddFilter')(filter, data.filterable);
    }
  },

  getFilterTypeTarget() {
    const target = {
      table: this.table
    };

    if (this.selectedTargetType === "Column") {
      target.column = this.column;
    }
    else if (this.selectedTargetType === "Hierarchy") {
      target.hierarchy = this.hierarchy;
      target.hierarchyLevel = this.hierarchyLevel;
    }
    else if (this.selectedTargetType === "Measure") {
      target.measure = this.measure;
    }

    return target;
  },

  getFilterOperatorAndValues() {
    const operatorAndValues = {
      type: this.selectedFilterType
    };

    if (this.selectedFilterType === "Basic") {
      operatorAndValues.operator = this.selectedBasicOperator;
      operatorAndValues.values = [this.value1, this.value2];
    }
    else if (this.selectedFilterType === "Advanced") {
      operatorAndValues.logicalOperator = this.selectedLogicalOperator;
      operatorAndValues.conditions = [
        {
          operator: this.conditionalOperatorA,
          value: this.valueA
        },
        {
          operator: this.conditionalOperatorB,
          value: this.valueB
        }
      ];
    }

    return operatorAndValues;
  },
  
  getFilterableTarget() {
    var target = this.get('report');
      
    if (this.get('selectedReportTarget') === "Page") {
      target = this.get('selectedPage');
    }
    else if (this.get('selectedReportTarget') === "Visual") {
      throw new Error(`Abilty to apply filters to visuals is not implemented yet`);
    }

    return target;
  }
});
