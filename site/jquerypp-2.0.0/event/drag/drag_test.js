steal("jquerypp/event/drop", 'steal-qunit', 'syn', "jquerypp/event/drop/drop_test.js",
function($, QUnit, syn) {

module("jquerypp/event/drag",{
	makePoints : function(){
		var div = $("<div>"+
			"<div id='drag'></div>"+
			"<div id='midpoint'></div>"+
			"<div id='drop'></div>"+
			"</div>");
	
		div.appendTo($("#qunit-fixture"));
		var basicCss = {
			width: "20px",
			height: "20px",
			position: "absolute",
			border: "solid 1px black"
		};
		$("#drag").css(basicCss).css({top: "0px", left: "0px", zIndex: 1000, backgroundColor: "red"});
		$("#midpoint").css(basicCss).css({top: "0px", left: "30px"});
		$("#drop").css(basicCss).css({top: "30px", left: "30px"});
	}
});
test("dragging an element", function(){
	var div = $("<div>"+
			"<div id='drag'></div>"+
			"<div id='midpoint'></div>"+
			"<div id='drop'></div>"+
			"</div>");
	$("#qunit-fixture").html(div);
	var basicCss = {
		width: "20px",
		height: "20px",
		position: "absolute",
		border: "solid 1px black"
	};
	$("#drag").css(basicCss).css({top: "0px", left: "0px", zIndex: 1000, backgroundColor: "red"})
	$("#midpoint").css(basicCss).css({top: "0px", left: "30px"})
	$("#drop").css(basicCss).css({top: "30px", left: "30px"});
	
	
	var drags = {}, drops ={};
	
	$("#qunit-fixture")
		.on("dragdown", '#drag',function(){
			drags.dragdown = true;
		})
		.on("draginit", '#drag', function(){
			drags.draginit = true;
		})
		.on("dragmove", '#drag', function(){
			drags.dragmove = true;
		})
		.on("dragend", '#drag', function(){
			drags.dragend = true;
		})
		.on("dragover", '#drag', function(){
			drags.dragover = true;
		})
		.on("dragout", '#drag', function(){
			drags.dragout = true;
		})
		.on("dragcleanup", '#drag', function() {
			drags.dragcleanup = true;
		});

	$("#qunit-fixture")
		.on("dropinit",'#drop', function(){ 
			drops.dropinit = true;
		})
		.on("dropover",'#drop', function(){ 
			drops.dropover = true;
		})
		.on("dropout",'#drop', function(){ 
			drops.dropout = true;
		})
		.on("dropmove",'#drop', function(){ 
			drops.dropmove = true;
		})
		.on("dropon",'#drop', function(){ 
			drops.dropon = true;
		})
		.on("dropend",'#drop', function(){ 
			drops.dropend = true;
		});

	stop();
	
	syn.drag("drag", {to: "#midpoint"},function(){
		ok(drags.dragdown, "dragdown fired correctly")
		ok(drags.draginit, "draginit fired correctly")
		ok(drags.dragmove, "dragmove fired correctly")
		ok(drags.dragend, 	"dragend fired correctly")
		ok(drags.dragcleanup, "dragcleanup fired correctly")
		ok(!drags.dragover,"dragover not fired yet")
		ok(!drags.dragout, "dragout not fired yet")
		//console.log(drags, drags.dragout)
		ok(drops.dropinit, "dropinit fired correctly")
		ok(!drops.dropover,"dropover fired correctly")
		ok(!drops.dropout, "dropout not fired")
		ok(!drops.dropmove,"dropmove not fired")
		ok(!drops.dropon,	"dropon not fired yet")
		ok(drops.dropend, 	"dropend fired")
	}).drag({to: "#drop"}, function(){
		ok(drags.dragover,"dragover fired correctly")
		ok(drops.dropover, "dropmover fired correctly")
		ok(drops.dropmove, "dropmove fired correctly")
		ok(drops.dropon,	"dropon fired correctly")
	}).drag({to: "#midpoint"}, function(){
		ok(drags.dragout, "dragout fired correctly")
		ok(drags.dragcleanup, "dragcleanup fired correctly")
	
		ok(drops.dropout, 	"dropout fired correctly")
		//div.remove();
		start();
		$("#qunit-fixture").off()
	});
});

test("move event", function(){
	var div = $("<div>"+
			"<div id='drag-move'></div>"+
			"<div id='move-to'></div>"+
		"</div>"),
		moved = false,
		draginit = false;
	$("#qunit-fixture").html(div);
	var basicCss = {
		width: "20px",
		height: "20px",
		position: "absolute",
		border: "solid 1px black"
	};
	$("#drag-move").css(basicCss).css({top: "0px", left: "0px", zIndex: 1000, backgroundColor: "red"})
	$("#move-to").css(basicCss).css({top: "0px", left: "100px"})

	stop();
	$('#drag-move').on({
		'draginit' : function() {
			draginit = true;
		},
		'move' : function() {
			moved = true;
		}
	});

	syn.drag("drag-move",{to: "#move-to"}, function(){
		ok(moved, 'Move event fired');
		start();
	});
});

test("drag position", function(){
	this.makePoints();
	
	
	var drags = {}, drops ={};
	
	$("#qunit-fixture").on("draginit",'#drag', function(){
		drags.draginit = true;
	})
	var offset = $('#drag').offset();

	stop();
	
	syn.drag("drag","+20 +20", function(){
		var offset2 = $('#drag').offset();
		equal(offset.top+20, Math.ceil(offset2.top), "top")
		equal(offset.left+20, Math.ceil(offset2.left), "left")
		start();
		$("#qunit-fixture").off()
	});
});

test("dragdown" , function(){
	var div = $("<div>"+
			"<div id='dragger'>"+
				"<p>Place to drag</p>"+
				"<input type='text' id='draginp' />"+
				"<input type='text' id='dragnoprevent' />"+
			"</div>"+
			"</div>");
	
	$("#qunit-fixture").html(div);
	$("#dragger").css({
		position: "absolute",
		backgroundColor : "blue",
		border: "solid 1px black",
		top: "0px",
		left: "0px",
		width: "200px",
		height: "200px"
	})
	var draginpfocused = false,
		dragnopreventfocused = false;
	
	$('#draginp').focus(function(){
		draginpfocused = true;
	});
	$('#dragnoprevent').focus(function(){
		dragnopreventfocused = true;
	});
	
	$('#dragger').bind("dragdown", function(ev, drag){
		if(ev.target.id == 'draginp'){
			drag.cancel();
		}else{
			ev.preventDefault();
		}
	});
	var offset = $('#dragger').offset();

	stop();
	syn.drag("draginp", "+20 +20",function(){
		var offset2 = $('#dragger').offset();
		equal(offset.top, Math.ceil(offset2.top), "top")
		equal(offset.left, Math.ceil(offset2.left), "left")
		
	}).drag("dragnoprevent","+20 +20", function(){
		var offset2 = $('#dragger').offset();
		equal(offset.top+20, Math.ceil(offset2.top), "top")
		equal(offset.left+20, Math.ceil(offset2.left), "left")
		// IE doesn't respect preventDefault on text inputs (http://www.quirksmode.org/dom/events/click.html)
		//if(!document.body.attachEvent) {
		//	ok(draginpfocused, "First input was allowed to be focused correctly");
		//}
			
		//ok(!dragnopreventfocused, "Second input was not allowed to focus");
		start();
	});

});

test("dragging child element (a handle)" , function(){
	var div = $("<div>"+
			"<div id='dragger'>"+
				"<div id='dragged'>Place to drag</div>"+
			"</div>"+
			"</div>");
	
	$("#qunit-fixture").html(div);
	$("#dragger").css({
		position: "absolute",
		backgroundColor : "blue",
		border: "solid 1px black",
		top: "0px",
		left: "0px",
		width: "200px",
		height: "200px"
	});

	var dragged = $('#dragged');
		
	$('#dragger').bind("draginit", function(ev, drag){
		drag.only();
		drag.representative(dragged);
	});
	
	stop();

	var offset = $('#dragger').offset();

	syn.drag("dragged", "+20 +20",function() {
		var offset2 = $('#dragger').offset();
		equal(offset.top, offset2.top, "top")
		equal(offset.left, offset2.left, "left")

		ok(dragged.is(':visible'), "Handle should be visible");

		start();
	});
});

});