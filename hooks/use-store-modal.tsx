import {create} from 'zustand';


interface useStoreModalinterface{
    isOpen:boolean;
    onOpen:()=>void;
    onClose:()=>void;
}


export const useStoreModal = create<useStoreModalinterface>((set)=>(
    {
        isOpen:false,
        onOpen:()=>set({isOpen:true}),
        onClose:()=>set({isOpen:false})
    }
))