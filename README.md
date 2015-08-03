# React-chosen

[React](http://facebook.github.io/react/) wrapper for [Chosen](http://harvesthq.github.io/chosen/) jQuery.

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


| Prop  | Accepted values  | Description |
| :------------ |:---------------:| :-------|
|  allowSingleDeselect | boolean | When a single select box isn't a required field, you allowSingleDeselect: true and Chosen will add a UI element for option deselection. This will only work if the first option has blank text. |
|  disableSearch | boolean | allow to search values |
|  disableSearchThreshold | integer  |  The disableSearchThreshold option can be specified to hide the search input on single selects if there are fewer than (n) options. |
|  enableSplitWordSearch | boolean| by setting true, Chosen will try to search in every word seperated by space |
|  inheritSelectClasses  |  boolean  | inheritSelectClasses   |
|  maxSelectedOptions  |  integer  |  number of selections, that can be selected in multiple selection  |
|  noResultsText  |  string  |  string to be displayed when no search result  |
|  placeholderTextMultiple  |  string  |  placeholder when no options are selected, Chosen multiple values  |
|  placeholderTextSingle  |  string  |   placeholder when no options are selected, Chosen single   |
|  searchContains  |  boolean  | default false   |
|  singleBackstrokeDelete  |  boolean  |  by setting true you enable deleting options by pressing backspace  |
|  width  |  string  |  you can specify width of chosen component  |
|  displayDisabledOptions  |  boolean  |  show disabled options in drop down  |
|  displaySelectedOptions | boolean  | show selected options in drop down |

## License

MIT.
