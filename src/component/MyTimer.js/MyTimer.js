import React from 'react';
import s from './myTimer.module.css'


export default class MyTimer extends React.Component{

    state = {
        hours: 0,
        mins: 0,
        secs: 0,
        isActive: false,
        pause: false,
        dubleClick: 0
    }
    intervalId = null;

    start = () => {
        if (this.state.dubleClick < 1 && this.state.pause) {
            this.setState(prevState => ({
               dubleClick: prevState.dubleClick + 1
            })); return
}

        if (this.state.isActive ) {
           return
       }
        this.setState({
            isActive: true,
            pause: false,
            dubleClick: 0
       })
            this.intervalId = setInterval(() => {
                this.setState(prevState => ({
                    secs: prevState.secs + 1
                })
                ); if (this.state.secs === 60) {
                    this.setState( prevState =>({
                        mins: prevState.mins + 1,
                        secs: 0
                    }))
                }; if (this.state.mins === 60) {
                    this.setState(prevState => ({
                        hours: prevState.hours + 1,
                        mins: 0
                    }))
                };

        }, 1000)
    }

    reset = () => {
        clearInterval(this.intervalId);
        this.setState({
            isActive: false,
             hours: 0,
        mins: 0,
        secs: 0,

        })
}


    stop = () => {
        clearInterval(this.intervalId);
        this.setState({
            isActive: false,
             pause: true
        })
}

    
    componentWillUnmount() {
        if (this.state.isActive) {
            clearInterval(this.intervalId)
        }
    }


    updateFace = (value) => {
  return String(value).padStart(2, '0');
}



    render() {
        const stHours = this.updateFace(this.state.hours)
        const stMins = this.updateFace(this.state.mins)
        const stSecs = this.updateFace(this.state.secs)

        return (
            <div className={s.container}>
                <p>
                    <span className={s.clock}>{stHours}</span> :  <span className={s.clock}>{stMins}</span> :   <span className={s.clock}>{stSecs}</span>
                </p>
                <section className={s.btnList}>
                    <button type="button" className={s.btn} onClick={this.start}>start</button>
                    <button type="button" className={s.btn} onClick={this.stop}>pause</button>
                     <button type="button" className={s.btn} onClick={this.reset }>reset</button>
                </section>
               
            </div>
        )
}
}


console.log(pad(1))

function pad(value) {
  return String(value).padStart(2, '0');
}