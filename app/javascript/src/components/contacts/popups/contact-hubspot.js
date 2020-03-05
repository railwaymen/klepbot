import React, { useState, useEffect } from 'react';
import PopupWrapper from './popup-wrapper';
import ContactsService from '../../../services/contacts-service';
import Loading from '../../shared/loading';

export default function ContactHubspot({ close, contact: { id } }) {
  const [contactHubspot, setContactHubspot] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { vid } = contactHubspot;

  const onConnect = async () => {
    setIsLoading(true);

    ContactsService.hubspotSave(id).then(contact => {
      setContactHubspot(contact)
    }).then(() => {
      setIsLoading(false);
    });
  }

  useEffect(() => {
    ContactsService.hubspot(id).then(contact => {
      setContactHubspot(contact)
    }).then(() => {
      setIsLoading(false);
    })
  }, []);

  if (isLoading) {
    return (
      <PopupWrapper title="Hubspot" close={close}>
        <div className="row">
          <div className="col container-message-info">
            Loading...
            <Loading />
          </div>
        </div>
      </PopupWrapper>
    )
  }

  return (
    <PopupWrapper title="Hubspot" close={close}>
      <div className="col">
        <div className="row">
          {vid ? <HubspotContainer {...contactHubspot} /> : <DisconnectedHubspot onConnect={onConnect} />}
        </div>
      </div>
    </PopupWrapper>
  )
}

function DisconnectedHubspot({ onConnect }) {
  return (
    <div className="col container-message-info">
      <h5>Seems that your record is not connected yet to the Hubspot!</h5>
      <div className="button-action" onClick={onConnect}>
        Connect
      </div>
    </div>
  )
}

function HubspotContainer({
  firstName,
  lastName,
  vid,
  email,
  phone,
  ownerId,
  lifecycleStage,
  status,
}) {
  return (
    <div className="col">
      <h5>{firstName} {lastName}</h5>
      <p>vid: {vid}</p>
      <p>firstName: {firstName}</p>
      <p>lastName: {lastName}</p>
      <p>email: {email}</p>
      <p>phone: {phone}</p>
      <p>ownerId: {ownerId}</p>
      <p>lifecycleStage: {lifecycleStage}</p>
      <p>status: {status}</p>
    </div>
  )
}