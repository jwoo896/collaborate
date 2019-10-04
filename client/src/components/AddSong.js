import React, { useRef } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useMutation } from "@apollo/react-hooks";
import gql from 'graphql-tag';
import addSong from '../queries/addSong';
import addSongToUser from "../queries/addSongToUser";
//will need to create query for fetching songs per user and updating that query when sending user back to profile

export default function AddSong() {
    let history = useHistory();
    const [values, setValues] = React.useState({
        success: false,
        url: "",
        // user: ""
    });

    const uploadInput = useRef(null);

    const handleChange = (e) => {
        setValues({success: false, url: ""});
    }

    const [ newSong ] = useMutation(addSong); //maybe add refecthQueries option with refecth songs per user before reroute to user profile page
    const [ newSongToUser ] = useMutation(addSongToUser);

    const handleUpload = (e) => {
        let file = uploadInput.current.files[0];
        // Split the filename to get the name and type
        let fileParts = uploadInput.current.files[0].name.split('.');
        let fileName = fileParts[0]; //add input for title, set filename to that value. (this will be object key for retrieval)
        let fileType = fileParts[1];
        console.log("Preparing the upload");
        axios.post("http://localhost:4000/sign_s3",{
            fileName : fileName,
            fileType : fileType
        })
            .then(response => {
                var returnData = response.data.data.returnData;
                var signedRequest = returnData.signedRequest;
                var url = returnData.url;
                setValues({url: url});

                newSong({
                    variables: {
                        title: fileName, //TODO for now until i add input field for title
                        url: url,
                        user: "5d9423c7713233c53023bd04" //TODO retrieve logged in user id
                    }
                }).then((song) => {
                    newSongToUser({
                        variables: {
                            songId: song.data.addSong.id
                        }
                    })
                });
                console.log("Recieved a signed request " + signedRequest);

                // Put the fileType in the headers for the upload
                var options = {
                    headers: {
                        'Content-Type': fileType
                    }
                };
                axios.put(signedRequest,file,options)
                    .then(result => {
                        console.log("Response from s3")
                        setValues({success: true});
                    })
                    .catch(error => {
                        alert("ERROR " + JSON.stringify(error));
                    })
            })
            .catch(error => {
                alert(JSON.stringify(error));
            })
    }

    const Success_message = () => (
        <div style={{padding:50}}>
            <h3 style={{color: 'green'}}>SUCCESSFUL UPLOAD</h3>
            <a href={values.url}>Access the file here</a>
            <br/>
        </div>
    );

    return (
        <div>
            <h1>UPLOAD A FILE</h1>
            {values.success ? <Success_message/> : null}
            <input onChange={handleChange} ref={uploadInput} type="file"/>
            <br/>
            <button onClick={handleUpload}>UPLOAD</button>
        </div>
    );
}
// class AddSong extends Component {
//     constructor(props){
//         super(props);
//         this.state = {
//             success : false,
//             url : "",
//             // user: this.props.client.readFragment({
//             //     id: 'User'
//             // })
//         }
//         this.handleChange = this.handleChange.bind(this);
//         this.handleUpload = this.handleUpload.bind(this);
//     }
//     handleChange(ev) {
//         this.setState({success: false, url : ""});
//     }
//     // Perform the upload
//     handleUpload(ev) {
//         let file = this.uploadInput.files[0];
//         // Split the filename to get the name and type
//         let fileParts = this.uploadInput.files[0].name.split('.');
//         let fileName = fileParts[0]; //add input for title, set filename to that value. (this will be object key for retrieval)
//         let fileType = fileParts[1];
//         console.log("Preparing the upload");
//         axios.post("http://localhost:4000/sign_s3",{
//             fileName : fileName,
//             fileType : fileType
//         })
//             .then(response => {
//                 var returnData = response.data.data.returnData;
//                 var signedRequest = returnData.signedRequest;
//                 var url = returnData.url;
//                 this.setState({url: url})
//
//                 // this.props.mutate({
//                 //     variables: {
//                 //         title: fileName,
//                 //         url: url,
//                 //         // user: this.props.user.id
//                 //     }
//                 // });
//                 console.log("Recieved a signed request " + signedRequest);
//
//                 // Put the fileType in the headers for the upload
//                 var options = {
//                     headers: {
//                         'Content-Type': fileType
//                     }
//                 };
//                 axios.put(signedRequest,file,options)
//                     .then(result => {
//                         console.log("Response from s3")
//                         this.setState({success: true});
//                     })
//                     .catch(error => {
//                         alert("ERROR " + JSON.stringify(error));
//                     })
//             })
//             .catch(error => {
//                 alert(JSON.stringify(error));
//             })
//     }
//
//
//     render() {
//         const Success_message = () => (
//             <div style={{padding:50}}>
//                 <h3 style={{color: 'green'}}>SUCCESSFUL UPLOAD</h3>
//                 <a href={this.state.url}>Access the file here</a>
//                 <br/>
//             </div>
//         )
//         return (
//             <div>
//                 <h1>UPLOAD A FILE</h1>
//                 {this.state.success ? <Success_message/> : null}
//                 <input onChange={this.handleChange} ref={(ref) => { this.uploadInput = ref; }} type="file"/>
//                 <br/>
//                 <button onClick={this.handleUpload}>UPLOAD</button>
//             </div>
//         );
//     }
// }
//
// export default graphql(addSong)(AddSong);