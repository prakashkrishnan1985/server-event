import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react'
import ReactSpeedometer from 'react-d3-speedometer'

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;


export const App = () =>{
  const [listening, setListening] = useState(false);
  const [cpuUsage, setcpuUsage] = useState(0);
  const [memoryUsage, setmemoryUsage] = useState(0);

  let eventSource = undefined;

  useEffect(()=>{
    if(!listening){
      eventSource = new EventSource("http://localhost:8080/get-performance");
      eventSource.onmessage=(event)=>{
        const use = JSON.parse(event.data)
        setcpuUsage(use.serverusage)
        setmemoryUsage(use.memoryUsage)
      }

      eventSource.onerror=(err)=>{
        console.error("Event source did not emit the events", err)
        eventSource.close();
      }
      setListening(true);
    }
    return () => {
      eventSource.close();
      console.log("event closed")
    }
  }, [])
  return (
    <div style={{ "marginTop": "20px", "textAlign": "center" }}>
        <h1>Dashboard</h1>
        <div style={{ "display": "inline-flex" }}>
            <div style={{"margin":"50px"}}>
                <ReactSpeedometer
                    maxValue={100}
                    value={cpuUsage}
                    valueFormat={"d"}
                    customSegmentStops={[0, 25, 50, 75, 100]}
                    segmentColors={["#a3be8c", "#ebcb8b", "#d08770", "#bf616a"]}
                    currentValueText={"CPU Usage: ${value} %"}
                    textColor={"black"}
                />
            </div>

            <div style={{"margin":"50px"}}>
                <ReactSpeedometer
                    maxValue={100}
                    value={memoryUsage}
                    valueFormat={"d"}
                    customSegmentStops={[0, 25, 50, 75, 100]}
                    segmentColors={["#a3be8c", "#ebcb8b", "#d08770", "#bf616a"]}
                    currentValueText={"Memory Usage: ${value} %"}
                    textColor={"black"}
                />
            </div>
        </div>

    </div>
)
}
export default App;