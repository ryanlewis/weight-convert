import React from 'react';
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'
import IconAdd from 'material-ui/svg-icons/content/add'
import IconDel from 'material-ui/svg-icons/content/remove'
import IconSwapVert from 'material-ui/svg-icons/action/swap-vert'

import convert from 'convert-units'
import round from './utils/round'


class Calculator extends React.Component {

  static propTypes = {
    formatter: React.PropTypes.object.isRequired,
  }

  static defaultProps = {
    formatter: new Intl.NumberFormat('en-GB')
  }

  constructor(props) {
    super(props)
    this.state = {
      kilos: '',
      pounds: ''
    }
  }

  handleKiloChange = evt => {
    const kilos = evt.target.value.replace(/\D/g, '')
    this.setKilos(kilos)
  }

  handlePoundChange = evt => {
    const pounds = evt.target.value.replace(/\D/g, '')
    this.setPounds(pounds)
  }

  setKilos = kilos => {
    const pounds = convert(kilos).from('kg').to('lb')
    this.updateWeights(kilos, pounds)
  }

  setPounds = pounds => {
    const kilos = convert(pounds).from('lb').to('kg')
    this.updateWeights(kilos, pounds)
  }

  updateWeights = (kilos, pounds) => {
    let k = round(kilos)
    let p = round(pounds)

    if (isNaN(k) || isNaN(p) || k === 0) {
      k = p = ''
    }

    this.setState({ kilos: k, pounds: p })
  }

  format = (n) => {
    let x = this.props.formatter.format(n)
    if (x === '0') x = ''
    return x
  }

  incKilos = () => this.setKilos(this.state.kilos + 1)
  decKilos = () => this.setKilos(this.state.kilos - 1)
  incPounds = () => this.setPounds(this.state.pounds + 1)
  decPounds = () => this.setPounds(this.state.pounds - 1)

  handleFlip = () => this.setState({flip: !this.state.flip})

  render() {

    const kilos = (
      <div style={{ display: 'flex'}}>
        <TextField
          hintText="0"
          floatingLabelText="Kilos (kg)"
          floatingLabelFixed={true}
          fullWidth
          onChange={this.handleKiloChange}
          value={this.format(this.state.kilos)}
        />

        <IconButton style={{ alignSelf: 'flex-end'}} onClick={this.incKilos}><IconAdd /></IconButton>
        <IconButton style={{ alignSelf: 'flex-end'}} onClick={this.decKilos}><IconDel /></IconButton>
      </div>
    )

    const pounds = (
      <div style={{ display: 'flex'}}>
        <TextField
          hintText="0"
          floatingLabelText="Pounds (lb)"
          floatingLabelFixed={true}
          fullWidth
          onChange={this.handlePoundChange}
          value={this.format(this.state.pounds)}
        />

        <IconButton style={{ alignSelf: 'flex-end'}} onClick={this.incPounds}><IconAdd /></IconButton>
        <IconButton style={{ alignSelf: 'flex-end'}} onClick={this.decPounds}><IconDel /></IconButton>
      </div>
    )

    return (
      <Paper style={{ padding: '1em', paddingBottom: '32px', maxWidth: '720px', margin: '2em auto'}}>

        { this.state.flip ? pounds : kilos }

        <div style={{textAlign: 'center'}}>
          <IconButton
            style={{marginTop: '16px', marginLeft: '-16px'}}
            onClick={this.handleFlip}
          ><IconSwapVert /></IconButton>
        </div>

        { this.state.flip ? kilos : pounds }

      </Paper>
    );
  }
}

export default Calculator;
