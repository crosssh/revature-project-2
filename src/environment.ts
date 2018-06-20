const dev = {
  context: 'https://8lomsjt0a6.execute-api.us-west-2.amazonaws.com/dev/'
}

const prod = {
  context: 'http://ec2-34-219-112-62.us-west-2.compute.amazonaws.com:3001/'
}

export const environment = process.env.NODE_ENV === 'production'
  ? prod
  : dev