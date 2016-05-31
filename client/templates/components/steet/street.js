var SIGN_SCALE = 10;
var IMAGE_SCALE = 10;

Template.street.onCreated(function() {
    this.sign_scale = new ReactiveVar( SIGN_SCALE );
    this.image_scale = new ReactiveVar( IMAGE_SCALE );
    this.image_top = new ReactiveVar( 0 );
    this.sign_top = new ReactiveVar( 0 );
});

Template.street.onRendered(function() {
    center_sign();
    this.image_top.set( image_top() );
    this.sign_top.set( sign_top() );
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
    sign_scale: function(){
        return this.sign_scale.get();
    },
    image_scale: function(){
        return this.image_scale.get();
    },
    image_top: function(){
        return this.image_top.get();
    },
    sign_top: function(){
        return this.sign_top.get();
    },
});

center_sign = function () {
    center_obj('.streetname');
    center_obj('.streetimage');
}

centerObj = function (classname) {
    var width = $(document).width();
    var left = width/2 - $('.'+classname).width()/2;
    $('.'+classname).css('left', left);
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
