import React, {Component} from 'react';
import ApiService from "../../ApiService";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { Dialog } from '@material-ui/core';
import Link from '@material-ui/core/Link';

const styles=theme => ({
    hidden: {
        display:'none'
    }
});

class UserListCompnent extends Component{

    constructor(props){
        super(props);
        this.state={
            users:[],
            userDetail:[],
            message:null,
            open:false
        }
    }

    componentDidMount(){
        this.reloadUserList();
    }
    reloadUserList = () =>{
        ApiService.fetchUsers()
        .then(res=>{
            console.log("유저리스트 불러오기 성공");
            console.log(res);
            this.setState({
                users:res.data
            })
        })
        .catch(err => {
            console.log('reloadUserList() Error!', err);
        })
    }   //reloadUserList End

    deleteUser = (userID) =>{
        ApiService.deleteUser(userID)
        .then(res => {
            this.setState({
                message:'user Deleted Successfully'
            });
            this.setState({
                users:this.state.users.filter(user => user.id !== userID)
            });
            console.log("삭제 성공");
        })
        .catch(err => {
            console.log('deleteUser() Error!', err); 
        })
    }   //deleteUser End

    editUser = (ID) =>{
        console.log("수정할 ID => ",ID);
        window.localStorage.setItem("userID",ID);
        this.props.history.push('/edit-user');
    }   //editUser End
    addUser = () =>{
        window.localStorage.removeItem("userID");
        this.props.history.push("/add-user");
    }
    detailUser= (ID) =>{
        ApiService.detailByID(ID)
        .then(res=>{
            console.log(res);
            console.log(res.data);
            this.setState({
                userDetail:res.data
            })
        })
        .catch(err => {
            console.log('DETAILE_USER() Error!', err);
        })
    }

    handleClickOpen = () =>{
        this.setState({
            open:true
        });
    }
    handleClose = () =>  {
        this.setState({
            open:false
        });
    }
    render(){
        const {classes} = this.props;        
        return(
            <div>
                <Typography variant="h4" style={style}>User List</Typography>
                <Button variant="contained" color="primary" onClick={this.addUser}> Add User </Button>
              <Table>
                  <TableHead>
                      <TableRow>
                          <TableCell>ID</TableCell>
                          <TableCell align="right">UserName</TableCell>
                          <TableCell align="right">Age</TableCell>
                          <TableCell align="right">FirstName</TableCell>
                          <TableCell align="right">LastName</TableCell>
                          <TableCell align="right">Salary</TableCell>
                          <TableCell align="right">Edit</TableCell>
                          <TableCell align="right">Delete</TableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                      {this.state.users.map(user =>
                        <TableRow key={user.id}>
                            <TableCell component="th" scope="user">{user.id}</TableCell>
                            <TableCell align="right" onClick={this.handleClickOpen} onClick={()=>this.detailUser(user.id)} ><Link style={pointer}>{user.username}</Link></TableCell>
                            <TableCell align="right">{user.age}</TableCell>
                            <TableCell align="right">{user.firstName}</TableCell>
                            <TableCell align="right">{user.lastName}</TableCell>
                            <TableCell align="right">{user.salary}</TableCell>
                            <TableCell align="right" >
                                <CreateIcon onClick={()=> this.editUser(user.id)} style={pointer} />
                            </TableCell>
                            <TableCell align="right" >
                                <DeleteIcon onClick={()=> this.deleteUser(user.id)} style={pointer} />
                            </TableCell>
                        </TableRow>
                        )}
                  </TableBody>
              </Table>

              <Dialog open={this.state.open} onClose={this.handleClose}>

                  <DialogTitle>
                       모달창
                  </DialogTitle>
              </Dialog>
            </div>
        );
    }

}   //Class End
const style ={
    display:'flex',
    justifyContent:'center'
}

const pointer={
    cursor:'Pointer'
}

export default UserListCompnent;