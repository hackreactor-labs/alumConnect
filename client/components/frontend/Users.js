import React from 'react'
import { Link } from 'react-router'
import { Row, Col, DropdownButton, MenuItem, Input, Grid, Image, Thumbnail } from 'react-bootstrap';

import RestHandler from '../../util/RestHandler';

class Users extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      users: [],
      groups: []
    }
  }

  componentDidMount() {
    RestHandler.Get('/db/users', (err, res) => {
      this.setState({users: res.body})
    });
    RestHandler.Get('/db/groups', (err, res) => {
      this.setState({groups: res.body})
    });
  }

  usersList() {
    var userCount = this.state.users.length;
    return this.state.users.map(function(user, index) {
      var {username, id} = user
      return(
        <Col xs={6} sm={4} md={3} lg={3}>
          <div className="user-card">
            <Image
              src='https://pixabay.com/static/uploads/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
              responsive
              />
            <h4><Link to={{pathname: `users/${id}`}}>{username}</Link></h4>
          </div>
        </Col>
      );
    });
  }
  cohortList() {
  }

  groupSelect(evt, key) {
    debugger;
    console.log(key);
  }

  renderGroups(groupSelect) {
    return this.state.groups.map (function(group) {
      var {id, group_name} = group;
      return(
        <MenuItem key={id} eventKey={id} onSelect={groupSelect}>{group_name}</MenuItem>
      );
    });
  }

  render() {
    const innerDropdown = (
      <DropdownButton bsStyle='default' title='Cohort40'>
        {this.renderGroups(this.groupSelect)}
      </DropdownButton>
    );

    var title = 'Cohort38'
    return (
      <div>
        <Row className="search-for-users">
          <Col xs={10} sm={10} md={10} lg={10}>
            <Input
              wrapperClassName='input-with-dropdown'
              type='text'
              ref='input'
              onChange={this.handleChange}
              placeholder="Search users"
              addonBefore = {innerDropdown}
              />
          </Col>
        </Row>
        <Row>
          {this.usersList()}
        </Row>
      </div>
    )
  }
}

module.exports = Users;