(function (window, React, $) {
    var Chosen = React.createClass({
        displayName: 'Chosen',

        componentDidUpdate: function () {
            // chosen doesn't refresh the options by itself, babysit it
            this.updateChosen();
        },

        /**************************************************
         *  this method clears any chosen
         *  selected value from dom, triggers update
         *************************************************/
        resetChosen: function () {
            var chosen = this.refs.select;
            if (chosen != undefined) {
                $(chosen.getDOMNode()).val('').trigger('chosen:updated');
            }
        },

        /**************************************************
         *  this method close chosen dropdown
         *************************************************/
        openChosen: function () {
            var chosen = this.refs.select;
            if (chosen != undefined) {
                $(chosen.getDOMNode()).trigger('chosen:open');
            }
        },

        /**************************************************
         *  this method close chosen dropdown
         *************************************************/
        closeChosen: function () {
            var chosen = this.refs.select;
            if (chosen != undefined) {
                $(chosen.getDOMNode()).trigger('chosen:close');
            }
        },

        /*************************************
         *  this method trigers react chosen
         *  update event
         ************************************/
        updateChosen: function () {
            var chosen = this.refs.select;
            if(chosen != undefined){
                $(chosen.getDOMNode()).trigger('chosen:updated');
            }
        },
        /*****************************************
         * This method returns array of selected
         * values
         ****************************************/
        handleChange: function (a, b, c) {
            // force the update makes it so that we reset chosen to whatever
            // controlled value the parent dictated
            this.forceUpdate();
            var options = a.target.options;
            var valuesSelected = [];
            for (var i = 0, l = options.length; i < l; i++) {
                if (options[i].selected) {
                    valuesSelected.push(options[i].value);
                }
            }
            //return array of values selected, to onChange callback function
            this.props.onChange && this.props.onChange(valuesSelected);
        },

        /*****************************************
         * This method initialize chosen for
         * DOM node, maps react-chosen-r props
         * with original chosen
         ****************************************/
        componentDidMount: function () {
            var props = this.props;
            var select = $(this.refs.select.getDOMNode());
            $(select)
                .chosen({
                    allow_single_deselect: props.allowSingleDeselect,
                    disable_search: props.disableSearch,
                    disable_search_threshold: props.disableSearchThreshold,
                    enable_split_word_search: props.enableSplitWordSearch,
                    inherit_select_classes: props.inheritSelectClasses,
                    max_selected_options: props.maxSelectedOptions,
                    no_results_text: props.noResultsText,
                    placeholder_text_multiple: props.placeholderTextMultiple,
                    placeholder_text_single: props.placeholderTextSingle,
                    search_contains: props.searchContains,
                    single_backstroke_delete: props.singleBackstrokeDelete,
                    width: props.width,
                    display_disabled_options: props.displayDisabledOptions,
                    display_selected_options: props.displaySelectedOptions
                })
                .on('chosen:maxselected', this.props.onMaxSelected)
                .change(this.handleChange);
        },
        componentWillUnmount: function () {
            $(this.refs.select.getDOMNode()).off('chosen:maxselected change');
        },

        render: function () {
            var selectProps = $.extend({}, this.props, {ref: "select"});
            return React.createElement("div", null,
                React.createElement("select", selectProps, this.props.children)
            );
        }
    });

    if (typeof module === 'undefined') {
        window.Chosen = Chosen;
    } else {
        // If we're dropping plain script tag, then we can assume Chosen and
        // jQuery are already loaded. For browserify, however, we need to
        // `require` the chosen npm module, which has the side-effect of attaching
        // chosen onto jQuery. Note that due to the nature of the third-party
        // chosen npm shim, we still need to manually include jQuery at the top
        // level.
        require('drmonty-chosen');
        module.exports = Chosen;
    }
})(
    window,
    typeof require === 'function' ? require('react') : React,
    jQuery
);
