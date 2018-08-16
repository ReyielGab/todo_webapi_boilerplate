import React from 'react';
import Radium, { StyleRoot } from 'radium';

// ** material-ui
import { TableRow, TableRowColumn } from 'material-ui/Table';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';

import { browserHistory } from 'react-router';

// *** material-ui icons
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
// import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import ViewIcon from 'material-ui/svg-icons/action/visibility';
import EditIcon from 'material-ui/svg-icons/editor/border-color';

const styles = {

    actionWrapper: {
        textAlign: 'right'
    }
};

@Radium
class UserListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    viewTodos() {
        const { user } = this.props;

        browserHistory.push(`/view-todos/${user.id}`)
    }

    render() {
        const { user, openEditUserDialog } = this.props;
        console.log(user, 'hehehahaha');
        return (

                <TableRow hoverable={true}>
                    <TableRowColumn> {user.id}  </TableRowColumn>

                    <TableRowColumn> {user.firstname} {user.middlename} {user.lastname}  </TableRowColumn>

                    <TableRowColumn> {user.age}  </TableRowColumn>

                    <TableRowColumn style={styles.actionWrapper}>
                        <IconMenu
                            iconButtonElement={
                                <IconButton>
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                            targetOrigin={{horizontal: 'right', vertical: 'top'}}>

                            <MenuItem
                                leftIcon={<ViewIcon />}
                                primaryText="View"
                                onClick={this.viewTodos.bind(this)}
                            />

                            <MenuItem
                                leftIcon={<EditIcon />}
                                primaryText="Edit"
                                onClick={openEditUserDialog.bind(this, user)}
                            />
                            

                        </IconMenu> 
                        
                    </TableRowColumn>
                </TableRow>

        )
    }
}

export default UserListItem;