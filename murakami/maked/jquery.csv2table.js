/* jquery.csv2table.js 
 *
 *   Plugin for jQuery
 *
 *   This plugin loads a CVS file (e.g. created using Excel) and creates a table
 *   with the contents in that CVS file.
 *   ---------------------------------------------------------------------------
 *   Demo    : http://jsgt.org/lib/jquery/plugin/csv2table/v002/test.htm
 *   URL     : http://plugins.jquery.com/project/csv2table
 *   Lisence : Public Domain  
 *   Author  : Toshiro Takahashi http://jsgt.org/mt/01/
 *   ---------------------------------------------------------------------------
 */
[

		{ 
			date : '2009.11.27',
			ver  : 'TEST csv2table-0.02-b-3.3-tm',  
			updates : [
				[ '1. support jGlycy http://code.google.com/p/jglycy/ ']
				[ '2. change syntax. jQuery.csv2table([url,] setting) Now url of arg1(string) is option. e.g. You can write as $('#view0').csv2table({url:"./data/Book12.csv"}) @see http://jsgt.org/lib/jquery/plugin/csv2table/v002/jglycy-test.htm']
			]
		},{ 
			date : '2009.6.6',
			ver  : 'csv2table-0.02-b-2.9', 
			updates : [
				[ '1. support jGlycy http://code.google.com/p/jglycy/ ']
				[ '2. change syntax. jQuery.csv2table([url,] setting) Now url of arg1(string) is option. e.g. You can write as $('#view0').csv2table({url:"./data/Book12.csv"}) @see http://jsgt.org/lib/jquery/plugin/csv2table/v002/jglycy-test.htm']
			]
		},{ 
			date : '2009.2.27',
			ver  : 'TEST csv2table-0.02-b-3.2-tm',  
			updates : [
				[ '1. rename setting.headerRow  Row data of header row index(Number). Change name from col_midasi. The upper line is ignored. The number of the basic table lines is fixed with the number of the lines of this line.']
			]
		},{ 
			date : '2009.1.13',
			ver  : 'TEST csv2table-0.02-b-3.1-tm',  
			updates : [
				[ '1. Iepngfix code. A provisional cord before ThemeRoller supporting. use(http://www.twinhelix.com/css/iepngfix/)']
			]
		},{ 
			date : '2009.1.10',
			ver  : 'TEST csv2table-0.02-b-3.01-tm',  
			updates : [
				[ '1. for ThemeRoller '],
				[ '2. del class className_sortMark'],
				[ '3. add class csv2table-sortN,csv2table-sortD,csv2table-sortA'],
				[ '4. rename op.className_* to cls_*'],
				[ '5. del sortNImg,sortDImg,sortAImg. now use ThemeRoller'],
				[ '6. del op.cls_tbl_h,op.cls_tbl_h_tr,op.cls_tbl_h_th,op.cls_tbl_b,op.cls_tbl_b_tr'],
				[ '7. del class csv2table-table-thead,csv2table-table-thead_tr,csv2table-table-th,csv2table-table-tbody,csv2table-table-tbody_tr'],
				[ '7. add op.defaultThemeRoller : "./tm/jquery-ui-themeroller-0/ui.theme.css"'],
				[ '8. add linkId4ThemeRoller  : "tm"'],
				[ '9. add Default CSS. $.csv2table.cssini and del css texts from setCSS method.'],
				[ '10. add setting.isInline. default false. Enable to set the Inline csv data from arguments[0]']
			]
		},		{ 
			date : '2009.1.10',
			ver  : 'csv2table-0.02-b-2.8', 
			updates : [
				[ '1. add setting.appendThead Array. Append a Row of Thead.(e.g. ["Name","Address"]) ']
				[ '2. fix. del line 176,179-184 on csv2table-0.02-b-2.7. ']
			]
		},{ 
			date : '2009.1.4',
			ver  : 'csv2table-0.02-b-2.7', 
			updates : [
				[ '1. add setting.limit limit : [ rowCount ] , limit : [ offset,rowCount ]'],
				[ '2. fix reset of click sort']
			]
		},{ 
			date : '2009.1.3',
			ver  : 'csv2table-0.02-b-2.6', 
			updates : [
				[ '1. add setting.orderBy : [['colName','sortType'],['colName','sortType'],...n ]']
			]
		},{ 
			date : '2009.1.1',
			ver  : 'csv2table-0.02-b-2.5', 
			updates : [
				[ '1. add setting.sortNImg .sortDImg .sortAImg  b2.5'],
				[ '2. del $.csv2table.updateMemo , add $.csv2table.update' ],
				[ '3. change default sortDImg to icon-d-green.gif, sortAImg to icon-a-green.gif']
			]
		},{ 
			date : '2008.12.31',
			ver  : 'csv2table-0.02-b-2.4', 
			updates : [
				[ '1. add $.csv2table.f.classifyByCol'],
				[ '2. add className csv2table-legends'],
				[ '3. add legends id rule csv2table-legend-idName-colindex']
			]
		},{ 
			date : '2008.12.27',
			ver  : 'csv2table-0.02-b-2.3', 
			updates : [
				[ '1. add setting.where']
			]
		},{
			date : '2008.12.17',
			ver  : 'csv2table-0.02-b-2.0', 
			updates : [
				[ '1. add op.numArignRight (Set the Number TD to "textAlign : right").'],
				[ '2. add Custom Selector: <a href="./selector-hoboNum.htm"  style="color:#aaa">_csv2table_hoboNum</a>'],
				[ '3. add Custom Selector: <a href="./selector-myComp.htm" style="color:#aaa">_csv2table_myComp</a> ) ' ],
				[ '4. Sorting for Number-like TD with 3 digit comma is possible now.']
			]
		},{
			date : '2008.12.04',
			ver  : 'csv2table-0.02-b-1.9', 
			updates : [
				[ '1. Bugfix for b-1.8(leak of ids) mkTable(rowsAry)->mkTable(id,rowsAry) and change some sortimages.'],
				[ '2.Methos $.csv2table.reset must need argument id '],
				[ '3.Enable onload with useChart.' ]
			]
		},{
			date : '2008.12.03',
			ver  : 'csv2table-0.02-b-1.8', 
			updates : [
				[ '1. change sort for http://plugins.jquery.com/node/4978 (The "sort" function to be triggered by clicking on the column header)']
			]
		},{
			date : '2008.8',
			ver  : 'csv2table-0.02-b-1.7', 
			updates : [
				[ '1. Added $.csv2table.name.']
			]
		},{
			date : '2008.8',
			ver  : 'csv2table-0.02-b-1.6', 
			updates : [
				[ '1.(op.labelX=="useChart")?head.slice(1):op.labelX.'],
				[ '2.Added $.csv2table.reset method.'],
				[ '3.Change $.fn.csv2table.wrtTable to $.csv2table.wrtTable.' ]
			]
		},{
			date : '2008.8',
			ver  : 'csv2table-0.02-b-1.5', 
			updates : [
				[ '1.added use jqchart:bar type.']
			]
		},{
			date : '2008.8',
			ver  : 'csv2table-0.02-b-1.4', 
			updates : [
				[ '1.Added setting.select {select:[0,1,3]}'],
				[ '2.Added setting.orderBy {orderBy:[[0,"A"]]} ']
			]
		},{
			date : '2008.8',
			ver  : 'csv2table-0.02-b-1.3', 
			updates : [
				[ '1.Added setting.orderBy array'],
				[ '2.Added  orderBy[[0,"A"],[1,"D"]] ']
			]
		}
]
