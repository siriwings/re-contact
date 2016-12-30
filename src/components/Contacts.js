import React,{Component} from 'react';
import ContactInfo from '../components/ContactInfo';
import ContactCreator from '../components/ContactCreator';
import ContactEditor from '../components/ContactEditor';
import ContactRemover from '../components/ContactRemover';
import update from 'react-addons-update';

class Contacts extends Component{

    constructor(props){
        super(props);
        this.state={
            contactData:[
                {name: "Abet", phone: "010-0000-0001"},
                {name: "Betty", phone: "010-0000-0002"},
                {name: "Charlie", phone: "010-0000-0003"},
                {name: "David", phone: "010-0000-0004"}
            ],
            selectedKey:-1,
            selected:{
                name:"",
                phone:""
            }
        };
    }

    _onSelect(key){
        //선택 할 컴포넌트가 이미 선택되어있다면 선택을 해제합니다.
        if(key==this.state.selectedKey){
            console.log("key select canceled");
            this.setState({
                selectedKey:-1,
                selected:{
                    name:"",
                    phone:""
                }
            });
            return;
        }

        //선택 할 컴포넌트가 선택되어있지않다면 선택
        this.setState({
            selectedKey:key,
            selected:this.state.contactData[key]
        });
        console.log(`${key} is selected`);
    }

    //child 컴포넌트에게 해당 컴포넌트가 선택된 상태인지 아닌지 알려줍니다.
    _isSelected(key){
        if(this.state.selectedKey==key){
            return true;
        }else{
            return false;
        }
    }

    _insertContact(name, phone){
        let newState = update(this.state, {
            contactData: {
                $push: [{"name": name, "phone": phone}]
            }
        });
        this.setState(newState);
    }

    _removeContact(){
        //contact가 선택되있지 않다면 _removeContact() 종료
        if(this.state.selectedKey==-1){
            console.log("contact not selected");
            return;
        }

        //실제 삭제 로직
        this.setState({
            contactData:update(
                this.state.contactData,
                {
                    $splice : [[this.state.selectedKey,1]]
                }
            ),
            //지우고 selectedKey값을 다시 -1로 설정.
            selectedKey:-1
        });

    }

    _editContact(name, phone){
        this.setState({
            contactData: update(
                this.state.contactData,
                {
                    [this.state.selectedKey]: {
                        name: { $set: name },
                        phone: { $set: phone }
                    }
                }
            ),
            selected: {
                name: name,
                phone: phone
            }
        });
    }



    render(){
        return(
            <div>
                <h1>Contacts</h1>
                <ul>
                    {/*
                    <ContactInfo name={this.state.contactData[0].name} phone={this.state.contactData[0].phone}/>
                    <ContactInfo name={this.state.contactData[1].name} phone={this.state.contactData[1].phone}/>
                    <ContactInfo name={this.state.contactData[0].name} phone={this.state.contactData[2].phone}/>
                     */}

                    {
                        this.state.contactData.map((contact,i)=>{
                        return (<ContactInfo name={contact.name}
                                              phone={contact.phone}
                                              key={i}
                                              conkey={i}
                                              contactKey={i}
                                              isSelected={this._isSelected.bind(this)(i)}
                                              onSelect={this._onSelect.bind(this)}/>);

                        })
                    }
                </ul>
                <ContactCreator onInsert={this._insertContact.bind(this)}/>
                <ContactRemover onRemove={this._removeContact.bind(this)}/>
                <ContactEditor isSelected={(this.state.selectedKey !=-1)}
                               contact={this.state.selected}
                               onEdit={this._editContact.bind(this)}/>
            </div>
        );
    }
}

export default Contacts;