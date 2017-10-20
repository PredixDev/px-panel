'use strict';(function(){Polymer({is:'px-panel',behaviors:[Polymer.IronResizableBehavior],listeners:{'iron-resize':'_onResize'},properties:{/**
      * Where to place the panel - one of `top`, `bottom`, `left`, or `right`.
      */position:{type:String,value:'right',reflectToAttribute:true,observer:'_onResize'},/**
       * Whether the panel is currently open (expanded).
       */opened:{type:Boolean,value:false,notify:true,reflectToAttribute:true},/**
       * If set to true, the panel will have `position:fixed` so it will
       * be attached to the browser window instead of its parent container.
       */fixed:{type:Boolean,value:false,reflectToAttribute:true,observer:'_onResize'},/**
       * If set to true, the panel will be opened and calls to the `close()` method will be ignored.
       * Mutating the `opened` property will still force a close of the panel.
       */persistent:{type:Boolean,value:false,observer:'_persistentChanged',reflectToAttribute:true},/**
       * Whether to display the panel with a `light`, `medium`, or `dark` background.
       * These terms are relative, and can be used in conjunction with px-theme,
       * px-dark-theme, or your custom theme or CSS variables to toggle between 3 different
       * background colors.
       */background:{type:String,value:'light',reflectToAttribute:true},/**
       * If set to true, the panel will appear with an offset relative to the screen / container edges.
       * Can be overridden or customized using the CSS variables.
       */floating:{type:Boolean,value:false,reflectToAttribute:true},/**
       * If set to true, the panel will not fully collapse when closed. It will appear in a minimized state.
       * You can use the content slot `minimized` to determine what will appear inside the panel while minimized
       * (likely an icon or button for fully opening the panel).
       */minimizable:{type:Boolean,value:false,reflectToAttribute:true},/**
       * Used internally to determine if the panel should display at full-width or full-height
       * for mobile responsiveness and space-constrained situations.
       */fullSize:{type:Boolean,value:false,reflectToAttribute:true,readOnly:true}},/**
    * Opens the panel
    */open:function open(){this.opened=true},/**
    * Closes the panel
    */close:function close(){if(!this.persistent){this.opened=false}},/**
     * Sets the `opened` property for persistent panels.
     */_persistentChanged:function _persistentChanged(newValue){if(newValue&&!this.opened){this.open()}},_onResize:function _onResize(e){this.debounce('resize',function(){if(this.fixed){if((this.position==='left'||this.position==='right')&&window.innerWidth<600||(this.position==='top'||this.position==='bottom')&&window.innerHeight<600){this._setFullSize(true)}else{this._setFullSize(false)}}else{if((this.position==='left'||this.position==='right')&&this.parentNode.getBoundingClientRect().width<600||(this.position==='top'||this.position==='bottom')&&this.parentNode.getBoundingClientRect().height<600){this._setFullSize(true)}else{this._setFullSize(false)}}},100)}})})();
//# sourceMappingURL=px-panel.js.map
