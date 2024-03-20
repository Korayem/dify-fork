import {
  memo,
  useState,
} from 'react'
import cn from 'classnames'
import { useTranslation } from 'react-i18next'
import ResultPanel from '../run/result-panel'
import TracingPanel from '../run/tracing-panel'
import { useStore } from '../store'

const WorkflowPreview = () => {
  const { t } = useTranslation()
  const [currentTab, setCurrentTab] = useState<string>('TRACING')
  const workflowRunningData = useStore(s => s.workflowRunningData)

  const switchTab = async (tab: string) => {
    setCurrentTab(tab)
  }

  return (
    <div className={`
      flex flex-col w-[420px] h-full rounded-2xl border-[0.5px] border-gray-200 shadow-xl bg-white
    `}>
      <div className='flex items-center justify-between p-4 pb-1 text-base font-semibold text-gray-900'>
        Test Run#${workflowRunningData?.result.sequence_number}
      </div>
      <div>
        <div className='shrink-0 flex items-center px-4 border-b-[0.5px] border-[rgba(0,0,0,0.05)]'>
          <div
            className={cn(
              'mr-6 py-3 border-b-2 border-transparent text-[13px] font-semibold leading-[18px] text-gray-400 cursor-pointer',
              currentTab === 'RESULT' && '!border-[rgb(21,94,239)] text-gray-700',
            )}
            onClick={() => switchTab('RESULT')}
          >{t('runLog.result')}</div>
          <div
            className={cn(
              'mr-6 py-3 border-b-2 border-transparent text-[13px] font-semibold leading-[18px] text-gray-400 cursor-pointer',
              currentTab === 'TRACING' && '!border-[rgb(21,94,239)] text-gray-700',
            )}
            onClick={() => switchTab('TRACING')}
          >{t('runLog.tracing')}</div>
        </div>
        {currentTab === 'RESULT' && (
          <ResultPanel
            inputs={workflowRunningData?.result?.inputs}
            outputs={workflowRunningData?.result?.outputs}
            status={workflowRunningData?.result?.status || ''}
            error={workflowRunningData?.result?.error}
            elapsed_time={workflowRunningData?.result?.elapsed_time}
            total_tokens={workflowRunningData?.result?.total_tokens}
            created_at={workflowRunningData?.result?.created_at}
            created_by={''}
            steps={workflowRunningData?.result?.total_steps}
          />
        )}
        {currentTab === 'TRACING' && (
          <TracingPanel
            list={workflowRunningData?.tracing || []}
          />
        )}
      </div>
    </div>
  )
}

export default memo(WorkflowPreview)