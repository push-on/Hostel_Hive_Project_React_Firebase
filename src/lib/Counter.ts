import { collection, getCountFromServer, query, where } from "firebase/firestore"
import { db } from "../config/firebase"

export async function Counter(Collection: string) {
	const coll = collection(db, Collection)
	const snapshot = await getCountFromServer(coll)
	return snapshot.data().count
}

export async function CounterField(Collection: string, Field: string) {
	const coll = collection(db, Collection)
	const q = query(coll, where(Field, "==", true))
	const snapshot = await getCountFromServer(q)
	return snapshot.data().count
}