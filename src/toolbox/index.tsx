import { VscSymbolProperty } from 'react-icons/vsc'
import { BiSolidComponent } from 'react-icons/bi'
import { TbListTree } from 'react-icons/tb'
import { ListComponentsView } from './components'
import { AllPropertiesView } from './properties'
import { TreeViewsComponent } from './tree-views'
import { useState } from 'react'

export const ToolboxComponent = () => {
  const [caseView, setCaseView] = useState<'property' | 'tree' | 'component'>('component')

  const renderCaseView = () => {
    switch (caseView) {
      case 'component':
        return <ListComponentsView />
      case 'tree':
        return <TreeViewsComponent />
      case 'property':
        return <AllPropertiesView />
      default:
        return <ListComponentsView />
    }
  }
  return (
    <div className='w-72 bg-gradient-toolbox-bg border-l-2 border-slate-200 shadow-lg flex flex-col p-2 gap-2'>
      <div className=' flex flex-row shadow-md bg-opacity-40' style={{ border: '1px solid #ccc' }}>
        <button
          className={`group relative p-2 flex-1 cursor-pointer  hover:bg-slate-200 ${
            caseView === 'component' ? 'bg-slate-700' : ''
          }`}
          style={{ transition: 'all ease .3s' }}
          onClick={() => setCaseView('component')}
        >
          <BiSolidComponent
            className='text-lg font-semibold text-center w-full text-slate-300 group-hover:text-slate-800'
            style={{ transition: 'all ease .3s' }}
          />
        </button>
        <button
          className={`group relative p-2 flex-1 cursor-pointer  hover:bg-slate-200 ${
            caseView === 'property' ? 'bg-slate-700' : ''
          }`}
          style={{ transition: 'all ease .3s' }}
          onClick={() => setCaseView('property')}
        >
          <VscSymbolProperty
            className='text-lg font-semibold text-center w-full text-slate-300 group-hover:text-slate-800'
            style={{ transition: 'all ease .3s' }}
          />
        </button>
        <button
          className={`group relative p-2 flex-1 cursor-pointer  hover:bg-slate-200 ${
            caseView === 'tree' ? 'bg-slate-700' : ''
          }`}
          style={{ transition: 'all ease .3s' }}
          onClick={() => setCaseView('tree')}
        >
          <TbListTree
            className='text-lg font-semibold text-center w-full text-slate-300 group-hover:text-slate-800'
            style={{ transition: 'all ease .3s' }}
          />
        </button>
      </div>

      {renderCaseView()}
    </div>
  )
}
