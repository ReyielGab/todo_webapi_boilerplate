import React from 'react';
import Radium, { StyleRoot } from 'radium';

import UserListItem from './list-items';

// * material-ui
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow } from 'material-ui/Table';
import CircularProgress from 'material-ui/CircularProgress';

import BasicDialog from '../../../../shared-components/basic-dialog';
import colorPallete from '../../../../util/styles/color-pallete'


import UserNewContainer from '../../new/container/new';
import UserEditContainer from '../../edit/container/edit';
import { EventEmitter } from 'events';

const styles = {    
    header: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    headerText: {
        color: colorPallete.primaryTextColor,
        fontSize: '24px',
        margin: '10px 0px 0px 10px'
    },
    loadingStyle: {
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '20px'
    }

};

// *** dialog options
const basicDialogOpts = {
    title : 'Do you want to remove',
    subtitle : 'This User will be permanently removed.',
    highlightTitle : null,
    open : false,
    closeDialog : null,
    actions: []    
};



@Radium
class UsersList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openNewUserDialog: false,
            openEditUserDialog: false,
            selectedUser: null,
            basicDialogOpts: basicDialogOpts
        }
    }

    onDisplayListOfUsers() {
        const { usersList } = this.props;
        return usersList.map((user, index) => (
            <UserListItem
                key={index}
                user={user}
                openEditUserDialog={this.onOpenEditUserDialog.bind(this)}
                openDeleteUserDialog={this.onOpenDeleteUserDialog.bind(this)}
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

    onOpenDeleteUserDialog(user, event) {
        event.preventDefault();
        this.setState({
            basicDialogOpts: {
                ...basicDialogOpts,
                highlightTitle : `User - ${user.firstname} ${user.middlename} ${user.lastname}`,
                open : true,
                closeDialog : this.onCloseBasicDialog.bind(this),

                actions: [
                    {
                        label : 'CANCEL',
                        action : this.onCloseBasicDialog.bind(this),
                    },
                    {
                        label : 'REMOVE',
                        action : this.onDeleteSelectedUser.bind(this, user), 
                        secondary : true
                    }
                ]
            }
        })
    }

    onDeleteSelectedUser(selectedUser, event) {
        event.preventDefault();
        const { deleteSelectedUser } = this.props;

        deleteSelectedUser(selectedUser.id, this.onCloseBasicDialog.bind(this));

    }

    onCloseBasicDialog() {

        this.setState({ 
            basicDialogOpts: { ...basicDialogOpts, open: false } 
        });
    }

    render() {
        const { usersList, userListRequestPending } = this.props;
        return (
            <StyleRoot>
                <div style={styles.header}>
                    <label style={styles.headerText}> List of Users </label>

                    <FloatingActionButton title="ADD NEW USER" secondary={true} style={{ marginRight: '10px' }} onTouchTap={this.onOpenNewUserDialog.bind(this)}>
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
                            {/* <TableHeaderColumn>ID</TableHeaderColumn> */}
                            <TableHeaderColumn>FULL NAME</TableHeaderColumn>
                            <TableHeaderColumn>AGE</TableHeaderColumn>
                            <TableHeaderColumn>TODO'S LEFT</TableHeaderColumn>
                            <TableHeaderColumn> </TableHeaderColumn>
                        </TableRow>

                    </TableHeader>

                    <TableBody
                        showRowHover={true}
                        displayRowCheckbox={false}>

                        {!userListRequestPending ? this.onDisplayListOfUsers() : <div style={styles.loadingStyle}> <CircularProgress size={80} thickness={5} /> </div> }

                    </TableBody>
                </Table>

                { /** BASIC DIALOG */ } 
                <BasicDialog
                    basicDialogOpts={ this.state.basicDialogOpts }
                    closeDialog={ this.onCloseBasicDialog.bind(this) }
                    // isPending={ basicDialogRequestPending }
                />   

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