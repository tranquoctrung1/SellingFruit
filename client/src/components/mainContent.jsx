import { Route, Routes } from "react-router-dom";

const MainContent = () => 
{
	return (
		<Routes>
          <Route exact path="/" element={<div>home page</div>}/>
          <Route exact path="/login" element={<div>login page</div>}/>
          <Route path="*" element={	<div>not found</div>}/>
        </Routes>
	)
}

export default MainContent;