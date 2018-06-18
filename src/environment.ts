const dev = {
  context: 'http://localhost:3001/'
}

const prod = {
  context: 'http://ec2-34-219-112-62.us-west-2.compute.amazonaws.com:3001/'
}

export const environment = process.env.NODE_ENV === 'production'
  ? prod
  : dev