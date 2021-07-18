import React, {useState, useReducer, useEffect} from "react"
import {findGenerics, createGeneric, updateGeneric, deleteGeneric} from "../repository/GenericRepository";
import {findDrugs, createDrug, updateDrug, deleteDrug} from "../repository/DrugRepository";
import styled from 'styled-components'
import Scanner from "./scanner";

function reducer(state, action) {
  switch (action.type) {
    case 'initialize':
      console.log(action.data);
      return action.data;
    case 'setValue':
      const newState = {...state};
      newState[action.fieldName] = action.fieldValue;
      return newState;
    case 'clear':
      return {};
    default:
      throw new Error();
  }
}

function ModelScreen({modelName, fields, find, create, update, destroy, getObjectDisplay = object => object._id}) {
  const [query, setQuery] = useState("");
  const [objects, setObjects] = useState(null);
  const [changeFormActive, setChangeFormActive] = useState(false);
  const [selectedObject, setSelectedObject] = useState(null);
  const [fieldValues, dispatch] = useReducer(reducer, {});
  const [camera, setCamera] = useState(false);

  const refresh = async () => {
    const response = await find(query);
    setObjects(response);
  };

  useEffect(refresh, [query]);

  function getFirstField(field) {
    const nestedFields = field.split("__");
    return nestedFields[0]
  }

  function getObjectField(object, field) {
    const fieldName = field.name;
    const transform = field.type === "money" ? value => value.toFixed(2) : value => value;
    if (fieldName.includes("__")) {
      const nestedFields = fieldName.split("__");
      return transform(object[nestedFields[0]][nestedFields[1]])
    }
    return transform(object[fieldName]);
  }

  function getObjectFieldId(object, field) {
    if (field.includes("__")) {
      const nestedFields = field.split("__");
      return object[nestedFields[0]]._id
    }
    return object[field];
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!selectedObject) {
      const data = fields.map(field => fieldValues[getFirstField(field.name)]);
      await create(...data);
      dispatch({type: "clear"});
      setChangeFormActive(false);
      return await refresh();
    }
    const data = fields.map(field => fieldValues[getFirstField(field.name)]);
    await update(selectedObject._id, ...data);
    dispatch({type: "clear"});
    setChangeFormActive(false);
    return await refresh();
  }

  function handleTextChange(fieldName, fieldValue) {
    dispatch({type: "setValue", fieldName, fieldValue});
  }

  return (
    <Container>
      <ModelName>{modelName}</ModelName>
      <hr style={{margin: "16px 0"}} />
      {objects === null ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div>
            {changeFormActive ? (
              <form onSubmit={handleSubmit}>
                <ObjectName>
                  {selectedObject ? `Edit ${modelName} ${getObjectDisplay(selectedObject)}` : `Create new ${modelName}`}
                </ObjectName>
                {fields.map((field, index) => (
                  <div style={{display: "flex", flexDirection: "column", margin: "16px 0"}} key={index}>
                    <div>{getFirstField(field.name)}</div>
                    <div style={{display: "flex", flexDirection: "row"}}>
                      <TextInput
                        type={"text"}
                        value={fieldValues[getFirstField(field.name)]}
                        onChange={e => handleTextChange(getFirstField(field.name), e.target.value)}/>
                      {field.type === "barcode" && (
                        <div style={{flexDirection: 'column'}}>
                          <BarcodeIcon onClick={() => setCamera(!camera)} active={camera}>!i||!</BarcodeIcon>
                        </div>
                      )}
                    </div>
                    {field.type === "barcode" && camera && (
                      <Scanner onDetected={result => {
                        handleTextChange(getFirstField(field.name), result);
                        setCamera(false);
                      }}/>
                    )}
                  </div>
                ))}
                <SubmitButton type={"submit"}>Save</SubmitButton>
                <CancelButton onClick={() => {
                  setChangeFormActive(false);
                  setSelectedObject(null);
                }}>
                  Cancel
                </CancelButton>
              </form>
            ) : (
              <div>
                <Search
                  type={"text"}
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder={"Search"}
                />
                <CreateButton onClick={() => setChangeFormActive(true)}>
                  + Create
                </CreateButton>
                {objects.length === 0 ? (
                  <div>No objects found.</div>
                ) : (
                  <Table>
                    <TableHeader>
                      <div style={{flex: 2}}>ID</div>
                      {fields.filter(field => !field.hideInListView).map(field => (
                        <div style={{flex: 1}} key={field}>{getFirstField(field.name)}</div>
                      ))}
                      <div style={{flex: 1}}>Actions</div>
                    </TableHeader>
                    {objects.map(object => (
                      <TableRow key={object._id}>
                        <a href={"#"} style={{flex: 2, color: "blue"}} onClick={() => {
                          setSelectedObject(object);
                          dispatch({
                            type: "initialize",
                            data: Object.fromEntries(fields.map(field => [
                              getFirstField(field.name),
                              getObjectFieldId(object, field.name)
                            ]))
                          });
                          setChangeFormActive(true);
                        }}>
                          {getObjectDisplay(object)}
                        </a>
                        {fields.filter(field => !field.hideInListView).map(field => (
                          <div key={field} style={{flex: 1}}>{getObjectField(object, field)}</div>
                        ))}
                        <a href={"#"} style={{flex: 1, color: 'red'}} onClick={async () => {
                          if (window.confirm("Are you sure you want to delete?")) {
                            destroy(object._id);
                            await refresh();
                          }
                        }}>
                          Delete
                        </a>
                      </TableRow>
                    ))}
                  </Table>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </Container>
  );
}

const Container = styled.div`
margin: 8px;
`;

const ModelName = styled.div`
font-size: 2em;
`;

const ObjectName = styled.div`
font-size: 1.2em;
margin: 16px 0;
color: #888;
`;

const Search = styled.input`
padding: 8px;
border: 1px solid #aaa;
border-radius: 4px;
`;

const TextInput = styled.input`
padding: 8px;
border: 1px solid #aaa;
border-radius: 4px;
`;

const BarcodeIcon = styled.div`
margin: 0 16px;
padding: 8px;
background-color: black;
color: white;
flex: 0;
border-radius: 8px;
cursor: pointer;

${props => props.active && `
background-color: #00A2FF;
`}
`;

const Button = styled.button`
margin: 8px 0;
padding: 8px;
border-radius: 8px;
`;

const Table = styled.div`
padding: 8px;
border: 1px solid black;
border-radius: 4px;
background-color: white;
color: black;
display: flex;
flex-direction: column;
`;

const TableHeader = styled.div`
padding: 8px;
display: flex;
flex-direction: row;
justify-content: space-around;
font-weight: bold;
`;

const TableRow = styled.div`
padding: 8px;
display: flex;
flex-direction: row;
justify-content: space-around;
`;

const CreateButton = styled(Button)`
margin: 8px 8px;
border: 1px solid blue;
background-color: blue;
color: white;
`;

const CancelButton = styled(Button)`
margin: 8px 8px;
border: 1px solid black;
background-color: white;
color: black;
`;

const SubmitButton = styled(Button)`
border: 1px solid blue;
background-color: blue;
color: white;
`;

function Admin() {
  const tabs = [
    (
      <ModelScreen
        modelName={"Generic"}
        fields={[
          {"name": "genericName"},
        ]}
        find={findGenerics}
        create={createGeneric}
        update={updateGeneric}
        destroy={deleteGeneric}
      />
    ),
    (
      <ModelScreen
        modelName={"Drug"}
        fields={[
          {"name": "brandName"},
          {"name": "genericName__genericName"},
          {"name": "barcode", "type": "barcode", "hideInListView": true},
          {"name": "price", "type": "money"},
          {"name": "dosage"},
        ]}
        find={findDrugs}
        create={createDrug}
        update={updateDrug}
        destroy={deleteDrug}
        getObjectDisplay={object => object.barcode || object._id}
      />
    ),
  ]
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <div>
      <div>
        {tabs.map((tab, index) => (
          <ModelButton
            key={index}
            href={"#"}
            onClick={() => setActiveTabIndex(index)}
            active={index === activeTabIndex}
          >
            {tab.props.modelName}
          </ModelButton>
        ))}
      </div>
      {tabs.map((tab, index) => (
        <div key={index} style={{"display": index === activeTabIndex ? "block" : "none"}}>
          {tab}
        </div>
      ))}
    </div>
  );
}

const ModelButton = styled.button`
margin: 8px;
padding: 8px;
border-radius: 8px;
${props => props.active ? `
border: 1px solid blue;
background-color: blue;
color: white;
` : `
border: 1px solid black;
background-color: white;
color: black;
`}
`;

export default Admin;
