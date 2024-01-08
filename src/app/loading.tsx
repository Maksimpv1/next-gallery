import { Box, CircularProgress } from "@mui/material";

export default function Loading () {
    return(
        <div style={{ 
            margin: "150px auto", 
            display: "flex" , 
            alignItems: "center", 
            justifyContent: "center" }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent:'center' }}>
                    <CircularProgress /></Box>
        </div>
    )
}