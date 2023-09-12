import { ChildBoxComponent } from './child'

export const ListComponentsView = () => {
  return (
    <div className='flex flex-col'>
      <ChildBoxComponent />
      <ChildBoxComponent />
      <ChildBoxComponent />
      <ChildBoxComponent />
    </div>
  )
}
