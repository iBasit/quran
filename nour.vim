hi clear
if exists("syntax_on")
  syntax reset
endif
runtime colors/dw_green.vim
"
"set background=dark
"
"hi clear
"
"if exists("syntax_on")
"
"    syntax reset
"
"endif
"
"let g:colors_name="dw_green"
"
"
"
""--------------------------------------------------------------------
"
"
"
"hi Boolean                                       guifg=#00ff00
"
"hi cDefine                                       guifg=#00ff00
"
"hi cInclude                                      guifg=#ffffff
"
"hi Comment                                       guifg=#696969
"
"hi Constant                                      guifg=#00ff00
"
"hi Cursor                         guibg=#444444  guifg=#ffffff
"
"hi CursorColumn                   guibg=#001100
"
"hi CursorLine                     guibg=#001800
"
"hi DiffAdd                        guibg=#333333  guifg=#00ff00
"
"hi DiffChange                     guibg=#333333  guifg=#00ff00
"
"hi DiffDelete                     guibg=#333333  guifg=#00ff00
"
"hi DiffText                       guibg=#333333  guifg=#ffffff
"
"hi Directory                      guibg=#000000  guifg=#00ff00
"
"hi ErrorMsg                       guibg=#ffffff  guifg=#000000
"
"hi FoldColumn                     guibg=#222222  guifg=#ff0000
"
"hi Folded                         guibg=#222222  guifg=#ff0000
"
"hi Function                       guibg=#000000  guifg=#00ff00
"
"hi Identifier                     guibg=#000000  guifg=#00bb00
"
"hi IncSearch       gui=none       guibg=#00bb00  guifg=#000000
"
"hi LineNr                         guibg=#000000  guifg=#008800
"
"hi MatchParen      gui=none       guibg=#222222  guifg=#00ff00
"
"hi ModeMsg                        guibg=#000000  guifg=#00ff00
"
"hi MoreMsg                        guibg=#000000  guifg=#00ff00
"
"hi NonText                        guibg=#000000  guifg=#ffffff
"
"hi Normal          gui=none       guibg=#000000  guifg=#c0c0c0
"
"hi Operator        gui=none                      guifg=#696969
"
"hi PreProc         gui=none                      guifg=#ffffff
"
"hi Question                                      guifg=#00ff00
"
"hi Search          gui=none       guibg=#00ff00  guifg=#000000
"
"hi SignColumn                     guibg=#111111  guifg=#ffffff
"
"hi Special         gui=none       guibg=#000000  guifg=#ffffff
"
"hi SpecialKey                     guibg=#000000  guifg=#00ff00
"
"hi Statement       gui=bold                      guifg=#00ff00
"
"hi StatusLine      gui=none       guibg=#008800  guifg=#000000
"
"hi StatusLineNC    gui=none       guibg=#444444  guifg=#000000
"
"hi String          gui=none                      guifg=#00bb00
"
"hi TabLine         gui=none       guibg=#444444  guifg=#000000
"
"hi TabLineFill     gui=underline  guibg=#000000  guifg=#ffffff
"
"hi TabLineSel      gui=none       guibg=#00aa00  guifg=#000000
"
"hi Title           gui=none                      guifg=#00ff00
"
"hi Todo            gui=none       guibg=#000000  guifg=#ff0000
"
"hi Type            gui=none                      guifg=#ffffff
"
"hi VertSplit       gui=none       guibg=#000000  guifg=#ffffff
"
"hi Visual                         guibg=#00dd00  guifg=#000000
"
"hi WarningMsg                     guibg=#888888  guifg=#000000



"- end of colorscheme -----------------------------------------------  



"Override the name of the base colorscheme with the name of this custom one
let g:colors_name = "nour"
"Clear the colors for any items that you don't like
"hi clear StatusLine
"hi clear StatusLineNC

"Set up your new & improved colors
"hi StatusLine guifg=black guibg=white
"hi StatusLineNC guifg=LightCyan guibg=blue gui=bold
highlight Identifier guifg=#aaff00
highlight Normal guifg=#efefef
highlight Type guifg=white
highlight Special guifg=#ffffee
highlight PreProc guifg=#99ff99
highlight Statement gui=none
highlight SpecialKey guifg=yellow
highlight Function guifg=yellow
highlight String guifg=orange
highlight Search guifg=#00ff00 guibg=#001100
highlight StatusLine guibg=#99ff00 guifg=black
highlight StatusLineNC guifg=#99ff00 guibg=black
highlight LineNr guifg=#99ff00
highlight MBENormal guibg=#99ff00 guifg=white
highlight MBEVisibleNormal guibg=#010101 guifg=#99ff00
highlight myAssignments gui=none guifg=#ffff00
highlight myDots gui=none guifg=#ffaa00
highlight mySemis gui=none guifg=#ffff00
match myAssignments /\(=\)\|\(:\)/
2match myDots /\(,\)\|\(\.\)/
3match mySemis /(\|)\|\(;\)/
