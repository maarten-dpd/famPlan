import {Injectable} from '@angular/core';
import {Label} from '../../datatypes/label';
import {RecipeService} from './recipe.service';
import {ActivityService} from './activity.service';
import {
  addDoc,
  collection,
  collectionData,
  CollectionReference,
  deleteDoc,
  doc,
  DocumentReference,
  Firestore,
  query, setDoc,
  where
} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LabelService {

  constructor(private recipeService: RecipeService, private activityService: ActivityService,
              private firestore:Firestore) {
  }

//crud operations
  async createLabel(name: string, color: string, type: string): Promise<void>  {
    const newLabel = {
      name: name,
      color:color,
      type:type,
      id:''
    };

    const docRef = await addDoc(
      this.#getCollectionRef<Label>('labels'),
      newLabel
    );
    newLabel.id = docRef.id
    await setDoc(docRef, newLabel);
  }
  async deleteLabel(id: string) {
    let labelDeleted = false
    if(!this.recipeService.labelIsInUse(id)){
      await deleteDoc(this.#getDocumentRef('labels', id));
      labelDeleted = true;
    }
    else if(!this.activityService.labelIsInUse(id)){
      await deleteDoc(this.#getDocumentRef('labels', id));
      labelDeleted=true;
    }
    return labelDeleted;
  }

//get data methods
  getAllLabels():Observable<Label[]> {
    return collectionData<Label>(
      query<Label>(
        this.#getCollectionRef('labels')
      ),
      { idField: 'id' }
    );
  }
  getLabelsByType(type: string):Observable<Label[]> {
    return collectionData<Label>(
      query<Label>(
        this.#getCollectionRef('labels'),
        where('type', '==', type)
      ),
      { idField: 'id' }
    );
  }

//misc methods
  #getCollectionRef<T>(collectionName: string): CollectionReference<T> {
    return collection(this.firestore, collectionName) as CollectionReference<T>;
  }
  #getDocumentRef<T>(collectionName: string, id: string): DocumentReference<T> {
    return doc(this.firestore, `${collectionName}/${id}`) as DocumentReference<T>;
  }

}
