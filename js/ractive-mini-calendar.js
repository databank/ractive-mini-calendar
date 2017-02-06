

var Calendar = Ractive.extend({
	isolated: true,
	template:
		"<div class='calendar {{#class}}{{class}}{{else}}blank{{/if}}' style='display: inline-block;{{style}}'>" +
		"	<input type='hidden' name='{{name}}' value='{{value}}'>"+
		"	<table>" +
		"		<thead>" +
		"			<tr>" +
		"				<th class='arrow'><a on-click='prev_month'>&lsaquo;</a></th>" +
		"				<th colspan='5'>" +
		"					{{head_month_name}} {{head_year}}" +
		"				</th>" +
		"				<th class='arrow'><a on-click='next_month'>&rsaquo;</a></th>" +
		"			</tr>" +
		"		</thead>"+
		"		<tbody>"+
		"			<tr>" +
		"				<th>Su</th>" +
		"				<th>Mo</th>" +
		"				<th>Tu</th>" +
		"				<th>We</th>" +
		"				<th>Th</th>" +
		"				<th>Fr</th>" +
		"				<th>Sa</th>" +
		"			</tr>"+
		"			{{#w}}"+
		"			<tr>" +
		"				{{#d}}"+
		"				<td class='{{c}} {{#out}}out{{/out}} {{#t}}today{{/t}} {{#s}}selected{{/s}}' {{^out}}on-click='@this.setdate(this,ymd)'{{/out}}>{{n}}</td>" +
		"				{{/d}}"+
		"			</tr>" +
		"			{{/w}}"+
		"		</tbody>"+
		"	</table>" +
		"	{{>content}}"+
		"</div>",
	setdate: function(e,value) {
		this.set('value',value)
		this.renderCalendar(this.get('view_month'), value, this.get('today') )
		this.fire('change', this, value )
	},
	renderCalendar: function(view_month, selected_date, today ) {
		//console.log("renderCalendar month=",view_month," selected date=",selected_date, " today=", today )
		var $days_before = new Date(view_month + '-01T00:00:00.000Z').getDay()
		var $calendar_begin = new Date(view_month + '-01T00:00:00.000Z').getTime() - (1000*60*60*24*$days_before)
		var $w = []
		for (var i=0;i<=34;i++) {
			$w[Math.floor(i/7)] = $w[Math.floor(i/7)] || {d:[]}
			$w[Math.floor(i/7)].d.push({
				n: parseInt(new Date($calendar_begin + (1000*60*60*24*i)).toISOString().substr(8,2)),
				ymd: new Date($calendar_begin + (1000*60*60*24*i)).toISOString().substr(0,10),
				out: (view_month==new Date($calendar_begin + (1000*60*60*24*i)).toISOString().substr(0,7) ? false : true ),
				t: (today!=new Date($calendar_begin + (1000*60*60*24*i)).toISOString().substr(0,10) ? false : true),
				s: (selected_date!=new Date($calendar_begin + (1000*60*60*24*i)).toISOString().substr(0,10) ? false : true),
			})
		}

		this.set('w',$w)
	},
	init: function () {

		var $today = this.get('today') === undefined ? new Date().toISOString().substr(0,10) : (isNaN(new Date(this.get('today'))) ? new Date().toISOString().substr(0,10) : new Date(this.get('today')).toISOString().substr(0,10))
		var $value = this.get('value') === undefined ? undefined : (isNaN(new Date(this.get('value'))) ? undefined : new Date(this.get('value')).toISOString().substr(0,10))

		this.set('view_month', $value ? $value.substr(0,7) : $today.substr(0,7))
		this.set('today', $today)

		this.observe( 'view_month', function ( view_month ) {
			var monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December']
			this.set('head_month', view_month.substr(5,2))-1
			this.set('head_month_name', monthNames[parseInt(view_month.substr(5,2))-1] )
			this.set('head_year', view_month.substr(0,4))
			this.renderCalendar(view_month, $value, $today )
			this.fire('changeview', this, view_month )
		})

		this.on('prev_month', function() {
			var prev_month = new Date(
									new Date(
										this.get('view_month').substr(0,7) + '-01T00:00:00.000Z'
									).getTime() - (1000*60*60*24)
								).toISOString()
			this.set('view_month',prev_month.substr(0,7))
		})
		this.on('next_month', function() {
			var next_month = new Date(
									new Date(
										this.get('view_month').substr(0,7) + '-01T00:00:00.000Z'
									).getTime() + (1000*60*60*24*32)
								).toISOString()
			this.set('view_month',next_month.substr(0,7))
		})
		this.on('setdate', function(e,p1) {
			console.log('setdate', e, p1)
		})
	},
	data: {},
})