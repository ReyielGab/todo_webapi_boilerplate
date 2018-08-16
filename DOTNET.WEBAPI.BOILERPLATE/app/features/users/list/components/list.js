import React from 'react';
import Radium, { StyleRoot } from 'radium';

import UserListItem from './list-items';

// * material-ui
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow } from 'material-ui/Table';

import colorPallete from '../../../../util/styles/color-pallete'


import UserNewContainer from '../../new/container/new';
import UserEditContainer from '../../edit/container/edit';

const styles = {    
    header: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    headerText: {
        color: colorPallete.primaryTextColor,
        fontSize: '24px',
        margin: '10px 0px 0px 10px'
    }
};



@Radium
class UsersList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openNewUserDialog: false,
            openEditUserDialog: false,
            selectedUser: null
        }
    }

    onDisplayListOfUsers() {
        const { usersList } = this.props;
        return usersList.map((user, index) => (
            <UserListItem
                key={index}
                user={user}
                openEditUserDialog={this.onOpenEditUserDialog.bind(this)}
            />
        ))
    }

    onOpenNewUserDialog() {
        this.setState({
            openNewUserDialog: true
        });
    }

    onCloseNewUserDialog() {
        this.setState({
            openNewUserDialog: false
        })
    }

    onOpenEditUserDialog(selectedUser) {
        this.setState({
            openEditUserDialog: true,
            selectedUser: selectedUser
        })
    }

    onCloseEditUserDialog() {
        this.setState({
            openEditUserDialog: false
        })
    }

    render() {
        const { usersList } = this.props;
        return (
            <StyleRoot>
                <div style={styles.header}>
                    <label style={styles.headerText}> List of Users </label>

                    <FloatingActionButton title="ADD NEW USERHAHAHA" secondary={true} style={{ marginRight: '10px' }} onTouchTap={this.onOpenNewUserDialog.bind(this)}>
                        <ContentAdd />
                    </FloatingActionButton>

                </div>
                <div style={{ width: '100%' }}>
                    <span style={{ marginLeft: '10px' }}> Total of {usersList.length} User/s </span>
                </div>

                <Table>
                    <TableHeader
                        adjustForCheckbox={false}
                        displaySelectAll={false}>
                        <TableRow>
                            <TableHeaderColumn>ID</TableHeaderColumn>
                            <TableHeaderColumn>FULL NAME</TableHeaderColumn>
                            <TableHeaderColumn>AGE</TableHeaderColumn>
                            <TableHeaderColumn> </TableHeaderColumn>
                        </TableRow>

                    </TableHeader>

                    <TableBody
                        showRowHover={true}
                        displayRowCheckbox={false}>

                        {this.onDisplayListOfUsers()}

                    </TableBody>
                </Table>

                {/* New User */}
                <UserNewContainer
                    openDialog={this.state.openNewUserDialog}
                    closeDialog={this.onCloseNewUserDialog.bind(this)}
                />

                {/* Edit User */}

               { 
                   this.state.selectedUser != null ?
               <UserEditContainer
                    openDialog={this.state.openEditUserDialog}
                    closeDialog={this.onCloseEditUserDialog.bind(this)}
                    selectedUser={this.state.selectedUser}
                />
                :null
                }


            </StyleRoot>
        )
    }
}

export default UsersList;