# React-chosen

[React](http://facebook.github.io/react/) wrapper for [Chosen](http://harvesthq.github.io/chosen/) jQuery.
This project is inspired by: [chenglou/react-chosen](https://github.com/chenglou/react-chosen)
## install

```sh
bower install react-chosen-r
```

Or simply drop the script somewhere on your page (after React and Chosen of course):

```html
<script src="path/to/react-chosen.js"></script>
```

The npm build works, but unfortunately not well:

```sh
npm install react-chosen-r
```

Due to the awkwardness of Chosen and jQuery on npm, you'll still have to include jQuery as a global dependency. Installing via npm is not recommended.

## API

Please refer to [Chosen](http://harvesthq.github.io/chosen/)'s API. It's pretty much the same, except:

- Every Chosen option employs camelCase, e.g. disable_search_threshold -> disableSearchThreshold.

- Or see Configuration and accepted props

## Example
###Basic example
```html
/** @jsx React.DOM */
React.renderComponent(
  <Chosen noResultsText="No result" value="Harvest" onChange={doSomething}>
    <option value="Facebook">Facebook</option>
    <option value="Harvest">Harvest</option>
  </Chosen>
, document.body);

// or multi-select
React.renderComponent(
  <Chosen defaultValue={["Apple"]} width="92px" data-placeholder="Select..." multiple>
    <option value="Apple">Apple</option>
    <option value="Facebook">Facebook</option>
    <option value="Harvest">Harvest</option>
  </Chosen>
, document.body);
```
###Creating your own component:
```javascript

var React = require('react');
var Chosen = require('react-chosen-r');

const SINGLE = 'single';
const MULTIPLE = 'multiple';

/**
 * React class that renders each option
 */
var Option = React.createClass({
    render: function(){
       return (
           <option  key={this.props.value} value={this.props.value}> {this.props.label} </option>
       );
   }
});
var ChosenComponent = React.createClass({
    getInitialState: function (){
        return {
            chosenType: this.props.chosenType,
        };
    },
    /**
     * This method is called when value is selected by user
     * @param selected
     */
    handleSelect:function(selected){
      this.props.handleChange(selected);
    },
    /**
     * According to @see this.state.chosenType
     * renders multiple or single choise component
     *
     * @param options
     * @param valueSelected
     * @returns {XML}
     */
    renderChosen: function(options, valueSelected){
            if(this.state.chosenType == SINGLE){
                return (
                    <Chosen defaultValue={valueSelected} onChange={this.handleSelect}  >
                        {options.map(function (option) {
                            return (
                                <Option key={option.value} value={option.value} label={option.label}/>
                            )
                        }, this)}
                    </Chosen>
                );
            }else if(this.state.chosenType == MULTIPLE){
                return (
                    <Chosen defaultValue={valueSelected}
                    placeholderTextMultiple={this.props.placeholderTextMultiple} 
                    onChange={this.handleSelect} 
                    ref={'reactChosen'} 
                    multiple 
                   >
                        {options.map(function (option) {
                            return (
                                <Option key={option.value} 
                                value={option.value} 
                                label={option.label}
                                />
                            )
                        }, this)}
                    </Chosen>
                );
        }
    },
    /**
     * Render chosen drop down menu
     * @returns {XML}
     */
    render: function () {
        var options = this.props.options;
        var valueSelected = this.props.value;
        return (
            <div>
                {this.renderChosen(options,valueSelected)}
            </div>
        );
    }
});

module.exports = ChosenComponent;
```

## Configuration and accepted props


| Prop  | Default  | Description |
| :------------ |:---------------:| :-------|
|  allowSingleDeselect | *false*| When set to true on a single select, Chosen adds a UI element which selects the first element (if it is blank). |
|  disableSearch | *false* | When set to true, Chosen will not display the search field (single selects only). |
|  disableSearchThreshold | *0*  |  THide the search input on single selects if there are fewer than (n) options. |
|  enableSplitWordSearch | *true* | By default, searching will match on any word within an option tag. Set this option to false if you want to only match on the entire text of an option tag. |
|  inheritSelectClasses  |  *false*  | When set to true, Chosen will grab any classes on the original select field and add them to Chosen’s container div.   |
|  maxSelectedOptions  |  *Infinity*  |  Limits how many options the user can select. When the limit is reached, the chosen:maxselected event is triggered. |
|  noResultsText  | *"No results match"*  |  The text to be displayed when no matching results are found. The current search is shown at the end of the text (e.g., No results match "Bad Search").  |
|  placeholderTextMultiple  |  *"Select Some Options"* |  The text to be displayed as a placeholder when no options are selected for a multiple select.  |
|  placeholderTextSingle  | *"Select an Option"* |  The text to be displayed as a placeholder when no options are selected for a single select.   |
|  searchContains  | *false*  | By default, Chosen’s search matches starting at the beginning of a word. Setting this option to true allows matches starting from anywhere within a word. This is especially useful for options that include a lot of special characters or phrases in ()s and []s.   |
|  singleBackstrokeDelete  |  *true*  |  By default, pressing delete/backspace on multiple selects will remove a selected choice. When false, pressing delete/backspace will highlight the last choice, and a second press deselects it.|
|  width  | *Original select width.* |  The width of the Chosen select box. By default, Chosen attempts to match the width of the select box you are replacing. If your select is hidden when Chosen is instantiated, you must specify a width or the select will show up with a width of 0.  |
|  displayDisabledOptions  |  *true*  |  By default, Chosen includes selected options in search results with a special styling. Setting this option to false will hide selected results and exclude them from searches. Note - this is for *multiple selects only*. In single selects, the selected result will always be displayed.  |
|  displaySelectedOptions | *true*  | By default, Chosen only shows the text of a selected option. Setting this option to true will show the text and group (if any) of the selected option. |

## License

MIT.
