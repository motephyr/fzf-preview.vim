import { executeCommandSelector } from "@/module/selector/execute-command"
import { globalVariableSelector } from "@/module/selector/vim-variable"
import { getBuffers } from "@/plugin/connector/buffers"
import { convertForFzf } from "@/plugin/connector/convert-for-fzf"
import type { FzfCommandDefinitionDefaultOption, ResourceLines, SourceFuncArgs } from "@/type"

export const buffers = async (_args: SourceFuncArgs): Promise<ResourceLines> => {
  const bufferList = (await getBuffers()) as ResourceLines

  const { enableDevIcons } = executeCommandSelector().options
  if (enableDevIcons) {
    const convertedBufferList = await convertForFzf(bufferList)
    return convertedBufferList
  } else {
    return bufferList
  }
}

export const buffersDefaultOptions = (): FzfCommandDefinitionDefaultOption => ({
  "--prompt": '"Buffers> "',
  "--multi": true,
  "--preview": `"${globalVariableSelector("fzfPreviewCommand") as string}"`
})
