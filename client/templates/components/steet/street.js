import { ReactiveVar } from 'meteor/reactive-var'

var SIGN_SCALE = 10;
var IMAGE_SCALE = 10;
var tmpl;

Template.street.onCreated(function() {
    this.sign_scale = new ReactiveVar( SIGN_SCALE );
    this.image_scale = new ReactiveVar( IMAGE_SCALE );
    this.image_top = new ReactiveVar( 0 );
    this.sign_top = new ReactiveVar( 0 );
    tmpl = this;
});

Streamy.on('new_sign', (d) => {
    play();
});

Template.street.helpers({
	name: function(){
		var state = State.findOne({name: 'state'})
		return state && state.status.street.name;
	},
	src: function(){
		var state = State.findOne({name: 'state'})
		return state && state.status.street.src;
	},
	street_name: function(){
		var state = State.findOne({name: 'state'})
		return state && state.status.street.name.replace(' ', '_');
	},
	visible: function(){
		var state = State.findOne({name: 'state'})
		return state && state.status.street.visible;
	},
    animation_length: function(){
        var state = State.findOne({name: 'state'});
        return state && state.status.street.animation_length;
    },
    sign_scale: function(){
        var scale = Template.instance().sign_scale.get();
        console.log("scl:");
        console.log(scale);
        return scale;
    },
    image_scale: function(){
        return Template.instance().image_scale.get();
    },
    image_top: function(){
        return Template.instance().image_top.get();
    },
    sign_top: function(){
        return Template.instance().sign_top.get();
    },
});

center_sign = function () {
    center_obj('streetname');
    center_obj('streetimage');
}

center_obj = function (classname) {
    var width = $(document).width();
    var left = width/2 - $('.'+classname).width()/2;
    $('.'+classname).css('left', left);
    console.log('centered this obj: ');
    console.log($('.'+classname));
}

image_top = function () {
   var screen_height = $(document).height();
   var image_height = $('.streetimage').outerHeight();

   return ((0.75*screen_height) - (image_height*IMAGE_SCALE))/IMAGE_SCALE;
}

sign_top = function () {
    var sign_height = $('.streetname').outerHeight();

    return ((image_top()*IMAGE_SCALE) - (sign_height*SIGN_SCALE))/SIGN_SCALE;
}

play = function () {
    center_sign();
    console.log(tmpl);
    tmpl.image_top.set( image_top() );
    tmpl.sign_top.set( sign_top() );
    $('.inner').addClass('grow');
}
