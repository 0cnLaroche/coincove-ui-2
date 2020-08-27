import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container'

export default class AddressForm extends React.Component {
    constructor(props) {
        super(props);
        this._value = props.defaultValue;
        this.state = {
          errors: {}
        }
        this.handleChange = this.handleChange.bind(this);
        this.validateField = this.validateField.bind(this);

    }
    get value() {
      // TODO this should return reference values
        return this._value;
    }
    /**
     * @returns true if no errors
     */
    validate() {
      // If there are validation errors
      if (this.errors !== {} || this.errors !== null) {
        return false;
      } else if ( // if one of the required fields is missing
        (!this.value.firstName)
        || !this.value.lastName
        || !this.value.address1
        || !this.value.city
        || !this.value.country
        || !this.value.postalCode) {
        this.errors.missingFields = true;
        return false;
      } else {
        delete this.errors.missingFields;
        return true;
      }
    }
    validateField(name, value, regex, message) {
      let reg = new RegExp(regex);
      if(!reg.test(value)) {
        this.state.errors[name] = {message};
        this.setState({errors: this.state.errors})
      } else if (this.state.errors[name]) {
        delete this.state.errors[name];
        this.setState({errors : this.state.errors});
      }
    }
    handleChange(event) {
      const name = event.target.name;
      const value = event.target.value;
      const object = new Object();
      object[name] = value;

      switch(name) {

        case 'postalCode':
          this.validateField(name, value, '^((\d{5}-\d{4})|(\d{5})|([AaBbCcEeGgHhJjKkLlMmNnPpRrSsTtVvXxYy]\d[A-Za-z]\s?\d[A-Za-z]\d))$', 'Invalid Postal code');
          break;
        default:
          break;
      }
      this._value = Object.assign(this._value, object);
      this.props.handleAddressChange(object, this.validate() ? null : this.errors);
    }
    render() {
      const { errors } = this.state;
        return (
    <Container maxWidth="sm">
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            defaultValue={this._value.firstName}
            id="firstName"
            name="firstName"
            label="First name"
            error={(errors.firstName == true)}
            fullWidth
            autoComplete="given-name"
            onChange={this.handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            defaultValue={this._value.lastName}
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            error={(errors.lastName == true)}
            autoComplete="family-name"
            onChange={this.handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            defaultValue={this._value.address1}
            id="address1"
            name="address1"
            label="Address line 1"
            error={(errors.address1 == true)}
            fullWidth
            autoComplete="shipping address-line1"
            onChange={this.handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            defaultValue={this._value.address2}
            id="address2"
            name="address2"
            label="Address line 2"
            error={(errors.address2 == true)}
            fullWidth
            autoComplete="shipping address-line2"
            onChange={this.handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            defaultValue={this._value.city}
            required
            id="city"
            name="city"
            label="City"
            error={(errors.city == true)}
            fullWidth
            autoComplete="shipping address-level2"
            onChange={this.handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
            defaultValue={this._value.state}
            id="state" 
            name="state" 
            label="State/Province/Region" 
            error={(errors.state == true)}
            fullWidth
            onChange={this.handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            defaultValue={this._value.postalCode}
            id="postalCode"
            name="postalCode"
            label="Postal code"
            error={(errors.postalCode == true)}
            fullWidth
            autoComplete="shipping postal-code"
            onChange={this.handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            defaultValue={this._value.country}
            id="country"
            name="country"
            label="Country"
            error={(errors.country == true)}
            fullWidth
            autoComplete="shipping country"
            onChange={this.handleChange}
          />
        </Grid>
        <Grid item xs={12}>
            {false && // FIXME This could be used eventually
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          />
            }
        </Grid>
      </Grid>
    </Container>
        )
    }
}
