import { Paper, Typography } from "@mui/material"

const WelcomeMessage = () => {
  return (
    <Paper sx={{p:2, background: "none", display: {xs: "none", md: "initial"}, maxWidth: "40%"}} elevation={0}>
        <Typography variant="h4" mb={3} sx={{alignSelf: "flex-start"}}>Welcome to Moby!</Typography>
        <Typography variant="subtitle1" mb={2} sx={{alignSelf: "flex-start"}}>
            Moby is a social media concept web app that has the features of a conventional social media website and application. 
            <br/>This includes the implementation of CRUD operations and a realtime database management system (chat system, friend status updates, notifications) using socket.io.
        </Typography>
        <Typography variant="subtitle2" mb={8} sx={{alignSelf: "flex-start"}}>
            Created using ReactJS, ReduxJSToolkit, ExpressJS, NodeJS, MySQL, Socket.io, and other related libraries.
        </Typography>
        <Typography variant="subtitle2" sx={{alignSelf: "flex-start"}}>
            Designed and developed by Paolo Bugarin.
        </Typography>
    </Paper>

  )
}

export default WelcomeMessage