import React, {useState, useReducer, useEffect} from "react"
import {findGenerics, createGeneric, updateGeneric, deleteGeneric} from "../repository/GenericRepository";
import {findDrugs, createDrug, updateDrug, deleteDrug} from "../repository/DrugRepository";
import styled from 'styled-components'

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

function ModelScreen({modelName, fields, find, create, update, destroy}) {
  const [query, setQuery] = useState("");
  const [objects, setObjects] = useState(null);
  const [changeFormActive, setChangeFormActive] = useState(false);
  const [selectedObject, setSelectedObject] = useState(null);
  const [fieldValues, dispatch] = useReducer(reducer, {});

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
    if (field.includes("__")) {
      const nestedFields = field.split("__");
      return object[nestedFields[0]][nestedFields[1]]
    }
    return object[field];
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
      const data = fields.map(field => fieldValues[getFirstField(field)]);
      await create(...data);
      dispatch({type: "clear"});
      setChangeFormActive(false);
      return await refresh();
    }
    const data = fields.map(field => fieldValues[getFirstField(field)]);
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
      {objects === null ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div>
            {changeFormActive ? (
              <form onSubmit={handleSubmit}>
                {fields.map((fieldName, index) => (
                  <div key={index}>
                    <div>{getFirstField(fieldName)}</div>
                    <TextInput
                      type={"text"}
                      value={fieldValues[getFirstField(fieldName)]}
                      onChange={e => handleTextChange(getFirstField(fieldName), e.target.value)}/>
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
                      <div style={{flex: 1}}>ID</div>
                      {fields.map(field => (
                        <div style={{flex: 1}} key={field}>{getFirstField(field)}</div>
                      ))}
                      <div style={{flex: 1}}>Actions</div>
                    </TableHeader>
                    {objects.map(object => (
                      <TableRow key={object._id}>
                        <a href={"#"} style={{flex: 1}} onClick={() => {
                          setSelectedObject(object);
                          dispatch({
                            type: "initialize",
                            data: Object.fromEntries(fields.map(field => [
                              getFirstField(field),
                              getObjectFieldId(object, field)
                            ]))
                          });
                          setChangeFormActive(true);
                        }}>
                          {object._id}
                        </a>
                        {fields.map(field => (
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
        fields={["genericName"]}
        find={findGenerics}
        create={createGeneric}
        update={updateGeneric}
        destroy={deleteGeneric}
      />
    ),
    (
      <ModelScreen
        modelName={"Drug"}
        fields={["brandName", "genericName__genericName", "price", "dosage",]}
        find={findDrugs}
        create={createDrug}
        update={updateDrug}
        destroy={deleteDrug}
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
