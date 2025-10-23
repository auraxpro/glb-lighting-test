'use client'

import { useControls, button, folder } from 'leva'
import { useCallback, useEffect, useRef } from 'react'

interface ControlsPanelProps {
  onSettingsChange: (settings: any) => void
  onExportSettings: () => void
}

export default function ControlsPanel({ onSettingsChange, onExportSettings }: ControlsPanelProps) {
  const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  
  // Get the current model selection to determine which part controls to show
  const modelSettings = useControls('Model Selection', {
    selectedModel: {
      value: '4-piece.glb',
      options: {
        '4-Piece Model': '4-piece.glb',
        '2-Piece Model': '2-piece.glb'
      },
      label: 'GLB Model'
    }
  })

  // Part controls - dynamic based on selected model
  const partControls = useControls('Part Colors', {
    part1Color: {
      value: '#666666',
      label: 'Part1 Color'
    },
    part2Color: {
      value: '#aaaaaa',
      label: 'Part2 Color'
    },
    // Only show these controls for 4-piece model
    ...(modelSettings.selectedModel === '4-piece.glb' && {
      part3Color: {
        value: '#888888',
        label: 'Part3 Color'
      },
      part4Color: {
        value: '#999999',
        label: 'Part4 Color'
      }
    })
  })

  const settings = useControls({
    // Lighting Controls
    'Environment & Lighting': folder({
      hdriIntensity: {
        value: 1,
        min: 0,
        max: 3,
        step: 0.1,
        label: 'HDRI Intensity'
      },
      environmentRotation: {
        value: 0,
        min: 0,
        max: 360,
        step: 1,
        label: 'Environment Rotation (°)'
      },
      directionalLightIntensity: {
        value: 1,
        min: 0,
        max: 5,
        step: 0.1,
        label: 'Directional Light Intensity'
      },
      directionalLightAngle: {
        value: 45,
        min: 0,
        max: 360,
        step: 5,
        label: 'Directional Light Angle (°)'
      },
      ambientLightColor: {
        value: '#ffffff',
        label: 'Ambient Light Color'
      },
      ambientLightIntensity: {
        value: 0.5,
        min: 0,
        max: 2,
        step: 0.1,
        label: 'Ambient Light Intensity'
      }
    }),
    
    // Material Controls
    'Material Properties': folder({
      roughness: {
        value: 0.5,
        min: 0,
        max: 1,
        step: 0.01,
        label: 'Roughness'
      },
      metalness: {
        value: 0.0,
        min: 0,
        max: 1,
        step: 0.01,
        label: 'Metalness'
      }
    }),
    
    // Background Controls
    'Background & Scene': folder({
      backgroundType: {
        value: 'hdri',
        options: {
          'HDRI Environment': 'hdri',
          'Solid Color': 'color',
          'Studio Preset': 'studio'
        },
        label: 'Background Type'
      },
      backgroundColor: {
        value: '#2a2a2a',
        label: 'Background Color'
      },
      enableShadows: {
        value: true,
        label: 'Enable Shadows'
      },
      shadowOpacity: {
        value: 0.3,
        min: 0,
        max: 1,
        step: 0.1,
        label: 'Shadow Opacity'
      }
    }),
    
    // Export Controls
    'Export Settings': folder({
      'Export Current Settings': button(() => onExportSettings()),
      'Reset to Defaults': button(() => {
        // This will trigger a reset of all controls to their default values
        window.location.reload()
      })
    })
  })

  // Update parent component whenever settings change with debouncing
  useEffect(() => {
    // Clear any pending updates
    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current)
    }

    // Debounce the settings update
    updateTimeoutRef.current = setTimeout(() => {
      try {
        // Combine model settings, part controls, and other settings
        const combinedSettings = {
          ...modelSettings,
          ...(partControls as any),
          ...settings
        }
        onSettingsChange(combinedSettings)
      } catch (error) {
        console.error('Error updating settings:', error)
      }
    }, 100) // 100ms debounce for Leva controls

    return () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current)
      }
    }
  }, [modelSettings, partControls, settings, onSettingsChange])

  return null // Leva handles its own rendering
}
