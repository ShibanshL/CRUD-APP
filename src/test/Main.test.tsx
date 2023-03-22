import {findByAltText, render,screen, fireEvent} from '@testing-library/react'
import Main from '../components/Main'
import Display from '../components/Display'
import userEvent from '@testing-library/user-event'
describe('Main',() => {
    
    beforeEach(() =>{
        render(<Main />)
    })


    test('Testing UI',async () => {
       const test = await screen.findByText('This is a test Task i have made')
        expect(test).toBeVisible()
    })


    test('Testing the length of mocked Data',async ()=>{
        const test = await screen.findAllByTestId('check')
        expect(test).toHaveLength(9)
    })


    test('Testing Adding data',async ()=>{
        const inputData = await screen.findByTestId('Add_Input')
        const buttonToAdd = await screen.findByRole('button',{name:'SUBMIT'})
        userEvent.click(inputData)
        userEvent.type(inputData,'This is just a test')
        userEvent.click(buttonToAdd)
        expect(screen.findByText('Your Data has been Succesfully Added!!'))
    })


    test('Testing Deleting data',async ()=>{
        const deleteButton:any = screen.findAllByTestId('DeleteButton')
        for(var i = 0; i<2; i++){
            userEvent.click(deleteButton[i])
            expect(screen.findByText('Your Data has been Succesfully Deleted!!'))
        }
       
    })


    test('Testing Editing data',async ()=>{
        const editButton = await screen.findAllByTestId('EditButton')
        for(var i = 0; i<2; i++){
            userEvent.click(editButton[i])
           
        }
        userEvent.type(await screen.findByTestId('editingText'),'testing for checking to see if this works.')
        userEvent.click(await screen.findByRole('button',{name:'Y'}))
        expect(screen.findByText('Your Data has been Succesfully Edited!!'))
    })


    test('Testing Filtering of Data',async ()=>{
        const FilterButton = await screen.findByRole('button', {name:'FILTER'})
        const SearchButton = await screen.findByTestId('Searchinp')
        userEvent.type(SearchButton,'This is a test Task i have made')
        userEvent.click(FilterButton)
        expect(await screen.findByText('This is a test Task i have made'))
    })
})