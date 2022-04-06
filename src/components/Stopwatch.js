/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import {formatMilliseconds} from '../Helpers/helpers';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconF from 'react-native-vector-icons/Feather';

export class Stopwatch extends Component {
  // TODO: Create mother class for stopwatch and timer
  constructor(props) {
    super(props);
    this.state = {
      timer: setInterval(() => {
        this.setState({
          timeString: formatMilliseconds(
            new Date().getTime() -
              this.state.timeStarted.getTime() +
              this.state.timeElapsed,
          ),
        });
      }, 10),
      timeStarted: new Date(),
      timeString: '',
      touched: false,
      isPaused: false,
      timeElapsed: 0,
    };
  }

  componentWillUnmount() {
    if (typeof this.state.timer !== 'undefined') {
      clearInterval(this.state.timer);
    }
  }

  pause() {
    clearInterval(this.state.timer);
    // time left
    this.setState({
      isPaused: true,
      touched: false,
      timeElapsed:
        new Date().getTime() -
        this.state.timeStarted.getTime() +
        this.state.timeElapsed,
    });
  }

  resume() {
    this.setState({
      isPaused: false,
      timeStarted: new Date(),
      touched: false,
      timer: setInterval(() => {
        this.setState({
          timeString: formatMilliseconds(
            new Date().getTime() -
              this.state.timeStarted.getTime() +
              this.state.timeElapsed,
          ),
        });
      }, 10),
    });
  }

  render() {
    return (
      <TouchableOpacity
        onPress={() => this.setState({touched: !this.state.touched})}
        style={{borderBottomWidth: 1, borderBottomColor: 'grey', height: 75}}>
        <Text style={{textAlign: 'center'}}>{this.props.title}</Text>
        {this.state.touched ? (
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() =>
                this.state.isPaused ? this.resume() : this.pause()
              }
              style={{flex: 0.25, alignItems: 'center'}}>
              {this.state.isPaused ? (
                <IconFA name={'play'} size={30} color={'blue'} />
              ) : (
                <IconFA name={'pause'} size={30} color={'blue'} />
              )}
            </TouchableOpacity>
            <Text style={{textAlign: 'center', fontSize: 30, flex: 0.5}}>
              Dismiss
            </Text>
            <TouchableOpacity
              onPress={this.props.delete}
              style={{flex: 0.25, alignItems: 'center'}}>
              <IconF name={'trash'} size={30} color={'red'} />
            </TouchableOpacity>
          </View>
        ) : (
          <Text style={{textAlign: 'center', fontSize: 40}}>
            {this.state.timeString}
          </Text>
        )}
      </TouchableOpacity>
    );
  }
}
