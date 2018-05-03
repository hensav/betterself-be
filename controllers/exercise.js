const axios = require('axios')

let training = {
  started: false,
  exercise: "",
  time: 0
}

exports.new = async (req, res) => {
  const { exercise, time } = req.query

  training.started = false

  if (training.started === false) {
    training.started = true
    training.time = time
    setInterval(()=>{
      training.time !== 0 ? training.time -= 1000 :null
    }, 1000)
    setTimeout(() => {
      training.started = false
      training.time = 0
    }, time)
  }

  return res.status(201).send({
    message: 'exercise ' + training.exercise + "started for " + training.time + "ms.",
    started: training.started,
    time: training.time
  })
}

exports.status = async (req, res) => {
  console.log(training)
  return res.status(201).send({
    message: training.started
    ? 'exercise ' + training.exercise + 'in progresss'
    :  'exercise ' + training.exercise + 'not in progress',
    started: training.started,
    time: training.time
  })
}
