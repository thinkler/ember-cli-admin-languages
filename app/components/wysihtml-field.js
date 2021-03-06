import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement: function(){
    if(!this.get('withEditor')){
      return;
    }
    var self = this;
    var element = this.$().find('textarea').wysihtml5();
    var editor = element.data("wysihtml5").editor;
    editor.on('change', function(){
      self.set('model.%@'.fmt(self.get('name')), editor.getValue());
    });

    editor.on('load', function(){
      editor.setValue(self.get('model.%@'.fmt(self.get('name'))));
    });
  },

  value: (function(key, value) {
    if (arguments.length > 1) {
      return this.get('model').set(this.get('name'), value);
    }
    return this.get('model').get(this.get('name'));
  }).property('name', 'model')
});