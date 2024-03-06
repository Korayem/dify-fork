'use client'
import type { FC } from 'react'
import React, { useCallback } from 'react'
import cn from 'classnames'
import copy from 'copy-to-clipboard'
import { useTranslation } from 'react-i18next'
import PromptEditorHeightResizeWrap from '@/app/components/app/configuration/config-prompt/prompt-editor-height-resize-wrap'
import PromptEditor from '@/app/components/base/prompt-editor'
import { Clipboard, ClipboardCheck } from '@/app/components/base/icons/src/vender/line/files'
import { Expand04 } from '@/app/components/base/icons/src/vender/solid/arrows'
import s from '@/app/components/app/configuration/config-prompt/style.module.css'
import { Trash03 } from '@/app/components/base/icons/src/vender/line/general'

type Props = {
  title: string | JSX.Element
  value: string
  variables: string[]
  onChange: (value: string) => void
  readOnly?: boolean
  showRemove?: boolean
  onRemove?: () => void
}

const Editor: FC<Props> = ({
  title,
  value,
  variables,
  onChange,
  readOnly,
  showRemove,
  onRemove,
}) => {
  const { t } = useTranslation()

  const minHeight = 98
  const [editorHeight, setEditorHeight] = React.useState(minHeight)
  const [isCopied, setIsCopied] = React.useState(false)
  const handleCopy = useCallback(() => {
    copy(value)
    setIsCopied(true)
  }, [value])
  const [isExpanded, setIsExpanded] = React.useState(false)
  const toggleExpand = useCallback(() => {
    setIsExpanded(!isExpanded)
  }, [isExpanded])

  return (
    <div className={cn(s.gradientBorder, '!rounded-[9px] shadow-md')}>
      <div className='rounded-lg bg-white'>
        <div className='pt-1 pl-3 pr-2 flex justify-between h-6 items-center'>
          <div className='leading-4 text-xs font-semibold text-gray-700 uppercase'>{title}</div>
          <div className='flex items-center'>
            <div className='leading-[18px] text-xs font-medium text-gray-500'>{value.length}</div>
            <div className='w-px h-3 ml-2 mr-2 bg-gray-200'></div>
            {/* Operations */}
            <div className='flex items-center space-x-2'>
              {showRemove && (
                <Trash03 className='w-3.5 h-3.5 text-gray-500 cursor-pointer' onClick={onRemove} />
              )}
              {!isCopied
                ? (
                  <Clipboard className='w-3.5 h-3.5 text-gray-500 cursor-pointer' onClick={handleCopy} />
                )
                : (
                  <ClipboardCheck className='mx-1 w-3.5 h-3.5 text-gray-500' />
                )
              }
              <Expand04 className='w-3.5 h-3.5 text-gray-500 cursor-pointer' onClick={toggleExpand} />
            </div>

          </div>
        </div>
        <PromptEditorHeightResizeWrap
          className='px-3 min-h-[102px] overflow-y-auto text-sm text-gray-700'
          height={editorHeight}
          minHeight={minHeight}
          onHeightChange={setEditorHeight}
          footer={(
            <div className='pl-4 pb-2 flex'>
              <div className="h-[18px] leading-[18px] px-1 rounded-md bg-gray-100 text-xs text-gray-500">{'{x} '}{t('workflow.nodes.common.insertVarTip')}</div>
            </div>
          )}
        >
          <PromptEditor
            className='min-h-[84px]'
            value={value}
            contextBlock={{
              show: true,
              selectable: true,
              datasets: [],
              onAddContext: () => { },
            }}
            variableBlock={{
              variables: variables.map(item => ({
                name: item,
                value: item,
              })),
              externalTools: [],
              onAddExternalTool: () => { },
            }}
            historyBlock={{
              show: true,
              selectable: true,
              history: {
                user: 'user',
                assistant: 'xxx',
              },
              onEditRole: () => { },
            }}
            queryBlock={{
              show: true,
              selectable: true,
            }}
            onChange={onChange}
            onBlur={() => { }}
            editable={!readOnly}
          />
        </PromptEditorHeightResizeWrap>
      </div>
    </div>
  )
}
export default React.memo(Editor)