import { useState } from "react";
import api from "../services/api";

function MLInsights() {

    const [form, setForm] = useState({

        taskType: "REST",

        dependencyCount: 2,

        retryCount: 1,

        workflowSize: 8,

        previousDuration: 4.5

    });

    const [prediction, setPrediction] = useState(null);

    const predict = () => {

        api.post("/ml/predict", form)

            .then(res => {

                setPrediction(res.data.predictedDuration);

            })

            .catch(err => {

                console.error(err);

                alert("Prediction failed.");

            });

    };

    return (

        <>

            <h1>
                🤖 ML Insights
            </h1>

            <div style={card}>

                <label>Task Type</label>

                <select

                    value={form.taskType}

                    onChange={e=>setForm({

                        ...form,

                        taskType:e.target.value

                    })}

                >

                    <option>REST</option>

                    <option>DATABASE</option>

                    <option>EMAIL</option>

                    <option>FILE</option>

                    <option>COMPUTE</option>

                </select>

                <label>Dependencies</label>

                <input

                    type="number"

                    value={form.dependencyCount}

                    onChange={e=>setForm({

                        ...form,

                        dependencyCount:Number(e.target.value)

                    })}

                />

                <label>Retries</label>

                <input

                    type="number"

                    value={form.retryCount}

                    onChange={e=>setForm({

                        ...form,

                        retryCount:Number(e.target.value)

                    })}

                />

                <label>Workflow Size</label>

                <input

                    type="number"

                    value={form.workflowSize}

                    onChange={e=>setForm({

                        ...form,

                        workflowSize:Number(e.target.value)

                    })}

                />

                <label>Previous Duration</label>

                <input

                    type="number"

                    step="0.1"

                    value={form.previousDuration}

                    onChange={e=>setForm({

                        ...form,

                        previousDuration:Number(e.target.value)

                    })}

                />

                <button

                    style={button}

                    onClick={predict}

                >

                    Predict

                </button>

            </div>

            {

                prediction &&

                <div style={resultCard}>

                    <h2>

                        Estimated Duration

                    </h2>

                    <h1>

                        {prediction} sec

                    </h1>

                    <p>

                        Model Status

                        <span style={online}>

                            🟢 Online

                        </span>

                    </p>

                </div>

            }

        </>

    );

}

const card={

    display:"grid",

    gap:"15px",

    maxWidth:"500px",

    background:"white",

    padding:"30px",

    borderRadius:"12px",

    boxShadow:"0 2px 8px rgba(0,0,0,.08)"

};

const resultCard={

    marginTop:"40px",

    background:"#EFF6FF",

    padding:"25px",

    borderRadius:"12px",

    maxWidth:"500px",

    textAlign:"center"

};

const button={

    marginTop:"15px",

    padding:"12px",

    border:"none",

    background:"#2563EB",

    color:"white",

    cursor:"pointer",

    borderRadius:"8px"

};

const online={

    color:"green",

    fontWeight:"bold",

    marginLeft:"10px"

};

export default MLInsights;