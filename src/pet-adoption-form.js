import React, {Component} from 'react';
import VRCheckboxGroup from './vr-checkbox-group';
import VRInput from './vr-input';
import VRRadioGroup from './vr-radio-group';
import VRSelect from './vr-select';
import VRTextArea from './vr-text-area';
import '../node_modules/spectre.css/dist/spectre.min.css';
import './pet-adoption-form.css';

class PetAdoptionForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ownerName: '',
      petSelections: [],
      selectedPets: [],
      ageOptions: [],
      ownerAgeRangeSelection: '',
      siblingOptions: [],
      siblingSelection: [],
      currentPetCount: 0,
      description: ''
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    this.handleFullNameChange = this.handleFullNameChange.bind(this);
    this.handlePetCountChange = this.handlePetCountChange.bind(this);
    this.handleAgeRangeSelect = this.handleAgeRangeSelect.bind(this);
    this.handlePetSelection = this.handlePetSelection.bind(this);
    this.handleSiblingsSelection = this.handleSiblingsSelection.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
  }

  componentDidMount() {
    console.log('pet-adoption-form.js componentDidMount: entered');
    //TODO: Why do I need to disable this ESLint rule?
    //eslint-disable-next-line dot-location
    fetch('./fake_db.json').
      //eslint-disable-next-line dot-location
      then(res => res.json()).
      then(data => {
        console.log('pet-adoption-form.js componentDidMount: data =', data);
        this.setState(data);
      });
  }

  handleFullNameChange(e) {
    this.setState({ownerName: e.target.value});
  }

  handlePetCountChange(e) {
    this.setState({currentPetCount: e.target.value});
  }

  handleAgeRangeSelect(e) {
    this.setState({ownerAgeRangeSelection: e.target.value});
  }

  handlePetSelection(e) {
    const selection = e.target.value;
    const {selectedPets} = this.state;

    // If it is currently selected, deselect it.
    // Otherwise, select it.
    const newSelectedPets =
      selectedPets.includes(selection) ?
      selectedPets.filter(s => s !== selection) :
      [...selectedPets, selection];

    this.setState({selectedPets: newSelectedPets});
  }

  handleSiblingsSelection(e) {
    this.setState({siblingSelection: [e.target.value]});
  }

  handleDescriptionChange(e) {
    this.setState({description: e.target.value});
  }

  handleClearForm(e) {
    e.preventDefault();
    this.setState({
      ownerName: '',
      selectedPets: [],
      ownerAgeRangeSelection: '',
      siblingSelection: [],
      currentPetCount: 0,
      description: ''
    });
  }

  handleFormSubmit(e) {
    e.preventDefault();

    const {state} = this;
    const formPayload = {
      ownerName: state.ownerName,
      selectedPets: state.selectedPets,
      ownerAgeRangeSelection: state.ownerAgeRangeSelection,
      siblingSelection: state.siblingSelection,
      currentPetCount: state.currentPetCount,
      description: state.description
    };

    console.log('formPayload =', formPayload);
    this.handleClearForm(e);
  }

  render() {
    const siblingQ =
      'Are you willing to adopt more than one pet ' +
      'if we have siblings for adoption?';
    const textAreaQ =
      'If you currently own pets, please write their names, breeds, ' +
      'and an outline of their personalities.';

    return (
      <form className="container" onSubmit={this.handleFormSubmit}>
        <h3>Pet Adoption Form</h3>
        <VRInput
          content={this.state.ownerName}
          inputType={'text'}
          name={'name'}
          onChange={this.handleFullNameChange}
          placeholder={'Type first and last name here'}
          title={'Full name'}
        />
        <VRSelect
          name={'ageRange'}
          onChange={this.handleAgeRangeSelect}
          options={this.state.ageOptions}
          placeholder={'Choose your age range'}
          selectedOption={this.state.ownerAgeRangeSelection}
        />
        <VRCheckboxGroup
          onChange={this.handlePetSelection}
          options={this.state.petSelections}
          selectedOptions={this.state.selectedPets}
          setName={'pets'}
          title={'Which kinds of pets would you like to adopt?'}
        />
        <VRRadioGroup
          onChange={this.handleSiblingsSelection}
          options={this.state.siblingOptions}
          selectedOptions={this.state.siblingSelection}
          setName={'siblings'}
          title={siblingQ}
          type={'radio'}
        />
        <VRInput
          content={this.state.currentPetCount}
          inputType={'number'}
          name={'currentPetCount'}
          onChange={this.handlePetCountChange}
          placeholder={'Enter number of current pets'}
          title={'How many pets do you currently own?'}
        />
        <VRTextArea
          content={this.state.description}
          name={'currentPetInfo'}
          onChange={this.handleDescriptionChange}
          placeholder={'Please be thorough in your descriptions'}
          resize={false}
          rows={5}
          title={textAreaQ}
        />
        <input
          className="btn btn-primary float-right"
          type="submit"
          value="Submit"
        />
        <button
          className="btn btn-link float-left"
          onClick={this.handleClearForm}
        >
          Clear form
        </button>
      </form>
    );
  }
}

export default PetAdoptionForm;
