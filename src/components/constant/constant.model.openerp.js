angular.module('epos')
/*constants of  model product.category*/
.constant('product.category', {
  'model': 'product.category',
  'fields': {
  	'id':'id',
  	'complete_name': 'complete_name',
  	'name': "name",
	'parent_id': 'parent_id',
	'property_account_expense_categ': 'property_account_expense_categ',
	'property_account_income_categ': 'property_account_income_categ',
	'property_stock_account_input_categ': 'property_stock_account_input_categ',
	'property_stock_account_output_categ': 'property_stock_account_output_categ',
	'property_stock_journal': 'property_stock_journal',
	'property_stock_valuation_account_id': 'property_stock_valuation_account_id',
	'removal_strategy_id': 'removal_strategy_id',
	'route_ids': 'route_ids',
	'type': 'type'
  },
  'defaultVal':{
  	'name': "Name of product",
	'parent_id': false,
	'property_account_expense_categ': 42,
	'property_account_income_categ': 157,
	'property_stock_account_input_categ': false,
	'property_stock_account_output_categ': false,
	'property_stock_journal': 9,
	'property_stock_valuation_account_id': false,
	'removal_strategy_id': false,
	'route_ids':  [[6, false, []]],
	'type': 'normal'
  }
})

/*constants of  model product.attribute*/
.constant('product.attribute', {
  'model': 'product.attribute',
  'fields': {
  	'id':'id',
  	'name': 'name'
  },
  'defaultVal':{
  	'name': "Name of attribute"
  }
})

/*constants of  model product.attribute.value*/
.constant('product.attribute.value', {
  'model': 'product.attribute.value',
  'fields': {
  	'id':'id',
  	'name': 'name',
  	'attribute_id':'attribute_id'
  },
  'defaultVal':{
  	'name': "Name of attribute value",
  	'attribute_id': 0
  }
})

