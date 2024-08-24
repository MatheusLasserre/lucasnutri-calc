import { forwardRef, useEffect, useState } from 'react'
import Style from './Utils.module.css'
import { clx } from '~/utils/style'
import { Loading } from './Loading'
import { BG_COLORS, type BG_COLORS_OPTIONS, CSS_VARS, type CSS_VARS_OPTIONS } from './colors'

type HideComponentProps = {
  children: React.ReactNode
  visible: boolean
}
export const HideComponent: React.FC<HideComponentProps> = ({ children, visible }) => {
  return visible ? <>{children}</> : null
}

type FlexRowProps = {
  children: React.ReactNode
  gap?: string
  horizontalAlign?: React.CSSProperties['justifyContent']
  verticalAlign?: React.CSSProperties['alignItems']
  width?: string
  maxWidth?: string
  height?: string
  maxHeight?: string
  margin?: string
  flexWrap?: React.CSSProperties['flexWrap']
  className?: string
  rowGap?: string
  columnGap?: string
  flexColumnWidthThreshold?: number
  columnHorizontalAlign?: React.CSSProperties['alignItems']
  columnVerticalAlign?: React.CSSProperties['justifyContent']
  position?: React.CSSProperties['position']
  onClick?: () => void
  onContextMenu?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  padding?: string
  backgroundColor?: BG_COLORS_OPTIONS
  styles?: React.CSSProperties
  columnWidth?:
    | '4'
    | '8'
    | '12'
    | '16'
    | '20'
    | '24'
    | '28'
    | '32'
    | '36'
    | '40'
    | '44'
    | '48'
    | '52'
    | '56'
    | '60'
    | '64'
    | '68'
    | '72'
    | '76'
    | '80'
    | '84'
    | '88'
    | '92'
    | '96'
    | '100'
}

export const FlexRow = forwardRef<HTMLDivElement, FlexRowProps>(
  (
    {
      children,
      gap,
      horizontalAlign,
      verticalAlign,
      maxWidth,
      margin,
      width,
      flexWrap,
      className,
      columnGap,
      rowGap,
      flexColumnWidthThreshold,
      columnHorizontalAlign,
      columnVerticalAlign,
      columnWidth,
      position,
      onClick,
      height,
      maxHeight,
      padding,
      styles,
      onContextMenu,
      backgroundColor
    },
    ref,
  ) => {
    const [toggleColumn, setToggleColumn] = useState(false)
    useEffect(() => {
      if (flexColumnWidthThreshold && window) {
        const handleResize = () => {
          if (flexColumnWidthThreshold) {
            setToggleColumn(window.innerWidth < flexColumnWidthThreshold)
          }
        }
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
      }
    }, [])
    return (
      <div
        ref={ref}
        style={{
          width: width || '100%',
          display: 'flex',
          flexDirection: toggleColumn ? 'column' : 'row',
          gap: gap || '4px',
          justifyContent: toggleColumn
            ? columnVerticalAlign || 'flex-start'
            : horizontalAlign || 'flex-start',
          alignItems: toggleColumn
            ? columnHorizontalAlign || 'flex-start'
            : verticalAlign || 'flex-start',
          maxWidth: maxWidth || '100%',
          margin: margin || 'unset',
          flexWrap: flexWrap || 'nowrap',
          columnGap: columnGap || gap || '4px',
          rowGap: rowGap || gap || '4px',
          position: position || 'static',
          height: height || 'unset',
          maxHeight: maxHeight || '100%',
          cursor: onClick ? 'pointer' : 'unset',
          padding: padding || 'unset',
          ...styles,
        }}
        data-width={toggleColumn ? columnWidth || '100' : '0'}
        className={clx(Style.FlexRow, backgroundColor ? BG_COLORS[backgroundColor]:'', className)}
        onClick={onClick}
        onContextMenu={onContextMenu}
      >
        {children}
      </div>
    )
  },
)

type FlexColumnProps = {
  children: React.ReactNode
  gap?: string
  horizontalAlign?: React.CSSProperties['alignItems']
  verticalAlign?: React.CSSProperties['justifyContent']
  maxWidth?: string
  margin?: string
  width?: string
  height?: string
  maxHeight?: string
  rowGap?: string
  columnGap?: string
  onClick?: () => void
  className?: string
  padding?: string
  styles?: React.CSSProperties
  backgroundColor?: BG_COLORS_OPTIONS
  onContextMenu?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}
export const FlexColumn = forwardRef<HTMLDivElement, FlexColumnProps>(
  (
    {
      children,
      gap,
      horizontalAlign,
      verticalAlign,
      maxWidth,
      margin,
      width,
      columnGap,
      rowGap,
      onClick,
      onContextMenu,
      height,
      maxHeight,
      className,
      padding,
      backgroundColor,
      styles,
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        style={{
          width: width || '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: gap || '4px',
          justifyContent: verticalAlign || 'flex-start',
          alignItems: horizontalAlign || 'flex-start',
          maxWidth: maxWidth || '100%',
          margin: margin || 'unset',
          columnGap: columnGap || gap || '4px',
          rowGap: rowGap || gap || '4px',
          height: height || 'unset',
          maxHeight: maxHeight || '100%',
          padding: padding || 'unset',
          backgroundColor: BG_COLORS[backgroundColor || 'undefined'],
          ...styles,
        }}
        onClick={onClick}
        className={clx(backgroundColor ? BG_COLORS[backgroundColor]:'', className)}
        onContextMenu={onContextMenu}
      >
        {children}
      </div>
    )
  },
)

type FlexItemProps = {
  children: React.ReactNode
  width?: string
  maxWidth?: string
  minWidth?: string
  height?: string
  minHeight?: string
  maxHeight?: string
  className?: string
  styles?: React.CSSProperties
}

export const FlexItem: React.FC<FlexItemProps> = ({
  children,
  width,
  maxWidth,
  minWidth,
  height,
  maxHeight,
  minHeight,
  className,
  styles,
}) => {
  return (
    <div
      style={{
        width: width || '100%',
        maxWidth: maxWidth || '100%',
        minWidth: minWidth || 'unset',
        height: height || 'unset',
        minHeight: minHeight || 'unset',
        maxHeight: maxHeight || 'unset',
        ...styles,
      }}
      className={className}
    >
      {children}
    </div>
  )
}

export const LoadingWrapper: React.FC<{ loading: boolean; children: React.ReactNode }> = ({
  loading,
  children,
}) => {
  if (loading) return <Loading />

  return <>{children}</>
}

export const IconNormalizer: React.FC<{
  color: CSS_VARS_OPTIONS
  children: React.ReactNode
  width: string
}> = ({ color, children, width }) => {
  return (
    <div className={Style.IconColorizer} style={{ color: CSS_VARS[color], width: width, height: width }}>
      {children}
    </div>
  )
}

export const IconBackgroundNormalizer: React.FC<{
  backgroundColor: BG_COLORS_OPTIONS
  color: CSS_VARS_OPTIONS
  children: React.ReactNode
  width: string
  padding?: string
}> = ({ color, children, width, backgroundColor, padding }) => {
  return (
    <div
      className={Style.IconBackgroundNormalizer}
      style={{
        backgroundColor: BG_COLORS[backgroundColor],
        width: width,
        height: width,
        padding: padding ? padding : '0',
      }}
    >
      <IconNormalizer color={color} width={width}>
        {children}
      </IconNormalizer>
    </div>
  )
}
