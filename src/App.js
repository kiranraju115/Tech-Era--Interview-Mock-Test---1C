import {Switch, Route} from 'react-router-dom'
import TechItems from './components/TechItems'
import TechItemDetails from './components/TechItemDetails'
import NotFound from './components/NotFound'

import './App.css'

// Replace your code here
const App = () => (
  <div className="bg-container">
    <Switch>
      <Route exact path="/" component={TechItems} />
      <Route exact path="/courses/:id" component={TechItemDetails} />
      <Route component={NotFound} />
    </Switch>
  </div>
)

export default App
