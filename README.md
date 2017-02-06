# RactiveMiniCalendar
RactiveMiniCalendar is a ractive component that shows an inline calendar with possibility to select a date. It does not depend on other libraries other than Ractive. 



## include it

```
	<script src="PATHTO/ractive-mini-calendar.js"></script>
	<link rel="stylesheet" href="PATHTO/ractive-mini-calendar.css"></script>
```

by default it will be available as 'RactiveMiniCalendar'

```
	var ractive = new Ractive({
		template: '<RactiveMiniCalendar />',
	})
```
you can rename it globally as 'calendar'

```
	Ractive.components.calendar = RactiveMiniCalendar
```
```
	var ractive = new Ractive({
		template: '<calendar />',
	})
```

or per Ractive instance

```
	var ractive = new Ractive({
				template: '<calendar />',
				components: { calendar: RactiveMiniCalendar },
			})
	<calendar/>
```

## use it

name it, there will be a hidden field named this way

```
	<calendar name="mycalendar"></calendar>
```

skin it
```
	<calendar class="myclass" style="background-color: pink;"></calendar>
```

set its value
```
	<calendar name="mycalendar1" value="1982-03-20"></calendar>
```

listen for change date event
```
	<calendar name="mycalendar1" on-change="changeCalendarValue"></calendar>
```
```
	ractive.on("changeCalendarValue", function(c, value ) {
		console.log("calendar",c.get('name')," value set to", value )
	})
```

listen for change month view
```
	<calendar name="mycalendar1" on-changeview="changeCalendarMonthView"></calendar>
```
```
	ractive.on("changeCalendarMonthView", function(c, value ) {
		console.log("calendar",c.get('name')," view set to", value )
	})
```

## demo
[basic](https://jsfiddle.net/6a38L3bv/1/)

