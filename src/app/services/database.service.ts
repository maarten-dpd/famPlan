import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  constructor() {
  }


  /**
   * Create a new message in the database.
   *
   * @param channel The channel on which the message must be placed.
   * @param message The message's content.
   */
  /*async sendMessage(channel: string, message: string): Promise<void> {
    const newMessage = {
      content: message,
      user: this.authService.getUserUID(),
      displayName: this.authService.getDisplayName(),
      profile: this.authService.getProfilePic(),
      date: Date.now()
    };
    await addDoc(
      this.#getCollectionRef<Message>(channel),
      newMessage
    );
  }

  /!**
   * Retrieve a collection of messages, the messages are returned once, they won't be updated when the data
   * in the database changes.
   *
   * @param channel The channel that contains the message.
   *!/
  retrieveMessages(channel: string): Observable<Message[]> {
    return collectionData<Message>(
      query<Message>(
        this.#getCollectionRef(channel),
        // Sort the messages by publication date, this is required because, by default, they are ordered by the ASCII
        // values of the characters that comprise the uuid.
        orderBy('date')
        // It is impossible to filter on 2 or more columns without an index.
        // If this is required, write the query, then open the developer console,
        // and click on the link in the error message. This will create an index on
        // combination of columns. After the index is done building, the query will work.
        // ,where('user', '==', this.authService.getUserUID())
      ),
      {idField: 'id'}
    );
  }

  /!**
   * Delete a specific message.
   *
   * @param channel   The channel that contains the message.
   * @param id The id of the message that is to be deleted.
   *!/
  async deleteMessage(channel: string, id: string): Promise<void> {
    await deleteDoc(this.#getDocumentRef(channel, id));
  }

  /!**
   * Update an existing message with new data.
   *
   * @param channel The channel that contains the message.
   * @param id      The id of the message that is to be updated.
   * @param msg     The new data.
   *!/
  async updateMessage(channel: string, id: string, msg: Message): Promise<void> {
    // Note that the key is set to undefined.
    // There is no point in including it in the data because this would mean it is
    // saved twice, once in the document, and once as the document identifier.
    delete msg.id;
    await updateDoc(this.#getDocumentRef(channel, id), msg);
  }

  /!**
   * Retrieve a reference to a specific collection, this is required to retrieve data in that collection.
   * The type of the reference (<T>) can be set to the type of object that is stored in the collection.
   *
   * @param collectionName The name of the collection.
   * @private
   *!/
  #getCollectionRef<T>(collectionName: string): CollectionReference<T> {
    return collection(this.firestore, collectionName) as CollectionReference<T>;
  }

  /!**
   * Retrieve a reference to a specific document in a specific collection, this is required to perform read, update and
   * delete operations on the data in that collection. The type of the reference (<T>) can be set to the type of object
   * that is stored in the document.
   *
   * @param collectionName The name of the collection.
   * @param id             The id of the document to which the reference points.
   * @private
   *!/
  #getDocumentRef<T>(collectionName: string, id: string): DocumentReference<T> {
    return doc(this.firestore, `${collectionName}/${id}`) as DocumentReference<T>;
  }*/
}
