import React, { useEffect } from 'react'
import Turnstone from 'turnstone'
import { useSelector } from "react-redux";

export const SearchBox = () => {
    const countries = useSelector((state) => state.countries);
    const countriesNames = []
    const isSpanish = useSelector((state) => state.isSpanish);
    const aux = ["Argentina", "Albania", "Uruguay", "España"]
    const listbox = [
        {
          data: aux,
          searchType: "startswith"
        }
    ];
    const styles = {
        input: 'w-full border py-4 px-4 text-lg outline-none rounded-3xl',
        listbox: 'bg-neutral-900 w-full text-slate-50 rounded-3xl',
        highlightedItem: 'bg-neutral-800',
        query: 'text-oldsilver-800 placeholder:text-slate-600',
        typeahead: 'text-slate-500',
        clearButton:
          'absolute inset-y-0 text-lg right-0 w-10 inline-flex items-center justify-center bg-netural-700 hover:text-red-500',
        noItems: 'cursor-default text-center my-20',
        match: 'font-semibold',
        groupHeading: 'px-5 py-3 text-pink-500',
    }

    const Item = ({ item }) => {
        return (
          <div className='flex items-center cursor-pointer px-5 py-6 rounded-3xl'>
            <p>{item}</p>
          </div>
        )
    }

    useEffect(()=>{
      countriesNames.map((el)=>{
        countriesNames.push(el.name)
      })
    },[countries])

  return (
    <Turnstone
      id='search'
      name='search'
      autoFocus={true}
      typeahead={true}
      clearButton={true}
      debounceWait={250}
      listboxIsImmutable={false}
      maxItems={2}
      noItemsMessage="No results..."
      placeholder={isSpanish ? "Introduce un país..." : 'Enter a country...'}
      listbox={listbox}
      styles={styles}
      Item={Item}
      onSelect={(text)=>{console.log(text);}}
    />
  )
}
