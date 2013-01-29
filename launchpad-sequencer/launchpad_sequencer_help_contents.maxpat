{
	"patcher" : 	{
		"fileversion" : 1,
		"appversion" : 		{
			"major" : 5,
			"minor" : 1,
			"revision" : 9
		}
,
		"rect" : [ -17.0, 173.0, 1440.0, 772.0 ],
		"bglocked" : 0,
		"defrect" : [ -17.0, 173.0, 1440.0, 772.0 ],
		"openrect" : [ 0.0, 0.0, 0.0, 0.0 ],
		"openinpresentation" : 1,
		"default_fontsize" : 13.0,
		"default_fontface" : 0,
		"default_fontname" : "Arial Black",
		"gridonopen" : 0,
		"gridsize" : [ 200.0, 15.0 ],
		"gridsnaponopen" : 0,
		"toolbarvisible" : 1,
		"boxanimatetime" : 200,
		"imprint" : 0,
		"enablehscroll" : 1,
		"enablevscroll" : 1,
		"devicewidth" : 0.0,
		"boxes" : [ 			{
				"box" : 				{
					"fontname" : "Arial Bold",
					"fontsize" : 13.0,
					"id" : "obj-81",
					"linecount" : 2,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 2378.0, 177.0, 481.0, 36.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 2400.0, 180.0, 804.0, 21.0 ],
					"text" : "Pressing 2 grid buttons at the same time will set the start/end steps for the pattern."
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial Bold",
					"fontsize" : 13.0,
					"id" : "obj-80",
					"linecount" : 4,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 2401.0, 195.0, 477.0, 66.0 ],
					"presentation" : 1,
					"presentation_linecount" : 2,
					"presentation_rect" : [ 2400.0, 210.0, 798.0, 36.0 ],
					"text" : "The top 8 buttons on the Launchpad perform the following operations on the currently selected pattern (to help you remember, these operations correspond to the row of 8 \"pattern edit\" buttons to the right of the pattern in the GUI):"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial Bold",
					"fontsize" : 13.0,
					"id" : "obj-79",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 2399.0, 140.0, 477.0, 21.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 2400.0, 135.0, 804.0, 21.0 ],
					"text" : "PATTERN EDIT MODE"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial Bold",
					"fontsize" : 13.0,
					"id" : "obj-78",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 2400.0, 40.0, 477.0, 21.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 2400.0, 60.0, 804.0, 21.0 ],
					"text" : "TRACK & PATTERN MUTE"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial Bold",
					"fontsize" : 13.0,
					"id" : "obj-70",
					"linecount" : 2,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1600.0, 557.0, 481.0, 36.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 2400.0, 345.0, 804.0, 21.0 ],
					"text" : "To exit \"pattern edit mode\", select a pattern by pressing one of the 8 buttons on the right side of the Launchpad."
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial Bold",
					"fontsize" : 13.0,
					"id" : "obj-68",
					"linecount" : 3,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1599.0, 478.0, 481.0, 51.0 ],
					"presentation" : 1,
					"presentation_linecount" : 2,
					"presentation_rect" : [ 2400.0, 300.0, 809.0, 36.0 ],
					"text" : "With the exception of copy & paste, these operations only apply to the start-end range of the pattern. Copy & paste always applies to the entire pattern."
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial Bold",
					"fontsize" : 13.0,
					"id" : "obj-67",
					"linecount" : 3,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1604.0, 490.0, 477.0, 51.0 ],
					"presentation" : 1,
					"presentation_linecount" : 2,
					"presentation_rect" : [ 2400.0, 255.0, 804.0, 36.0 ],
					"text" : "(1) shift pattern up, (2) shift pattern down, (3) shift pattern left, (4) shift pattern right, (5) reverse pattern, (6) invert pattern, \n(7) copy pattern (8) paste pattern."
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial Bold",
					"fontsize" : 13.0,
					"id" : "obj-66",
					"linecount" : 2,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1603.0, 450.0, 477.0, 36.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 2400.0, 150.0, 798.0, 21.0 ],
					"text" : "Hold down the current tracks' button and press a pattern button 3 times to enter \"pattern edit mode\". While in this mode:"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial Bold",
					"fontsize" : 13.0,
					"id" : "obj-51",
					"linecount" : 2,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1593.0, 419.0, 477.0, 36.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 2400.0, 75.0, 804.0, 21.0 ],
					"text" : "Press a track or patterns' button 3 times in a row to toggle the track/pattern mute. "
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial Bold",
					"fontsize" : 13.0,
					"id" : "obj-31",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1612.0, 395.0, 474.0, 21.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 2400.0, 0.0, 804.0, 21.0 ],
					"text" : "On the Launchpad hardware, the following shortcuts exist:"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial Bold",
					"fontsize" : 13.0,
					"id" : "obj-22",
					"linecount" : 3,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1593.0, 317.0, 474.0, 51.0 ],
					"presentation" : 1,
					"presentation_linecount" : 2,
					"presentation_rect" : [ 1600.0, 60.0, 804.0, 36.0 ],
					"text" : "Use a track's step length multiplier to make the tracks run at different rates. For example, you can set one track's step multiplier to 2, and another's to 3, in order to create 2-against-3 polyrhtyms."
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial Bold",
					"fontsize" : 13.0,
					"id" : "obj-15",
					"linecount" : 4,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1605.0, 271.0, 473.0, 66.0 ],
					"presentation" : 1,
					"presentation_linecount" : 3,
					"presentation_rect" : [ 1600.0, 285.0, 802.0, 51.0 ],
					"text" : "Put your target instrument on a different track. Then you can record the sequencer's MIDI output in clips on that track. Once you've recorded clips, you can fine-tune your generated patterns with Live's MIDI editing features. This is also the key to avoiding timing problems."
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial Bold",
					"fontsize" : 13.0,
					"id" : "obj-65",
					"linecount" : 3,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 784.0, 27.0, 460.0, 51.0 ],
					"presentation" : 1,
					"presentation_linecount" : 2,
					"presentation_rect" : [ 800.0, 45.0, 800.0, 36.0 ],
					"text" : "Remember: Each track produces MIDI by applying its 8 patterns' current step values, in order from pattern 1 to pattern 8.\nThe best way to understand how patterns work is to experiment!"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial Bold",
					"fontsize" : 13.0,
					"id" : "obj-64",
					"linecount" : 4,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 812.0, 298.0, 416.0, 66.0 ],
					"presentation" : 1,
					"presentation_linecount" : 2,
					"presentation_rect" : [ 800.0, 240.0, 803.0, 36.0 ],
					"text" : "If multiple gates fire on a single step of a track, the later gate will \"overwrite\" the note from the earlier gate. Depending on the  type of the later gate, the pitch or velocity of an existing note will be maintained (instead of reseting to the track pitch/velocity). "
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial Bold",
					"fontsize" : 13.0,
					"id" : "obj-63",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 801.0, 372.0, 469.0, 21.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 800.0, 510.0, 469.0, 21.0 ],
					"text" : "MODS"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial Bold",
					"fontsize" : 13.0,
					"id" : "obj-62",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 813.0, 316.0, 469.0, 21.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 800.0, 450.0, 469.0, 21.0 ],
					"text" : "CONTINOUS CONTROLLER (CC)"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial Bold",
					"fontsize" : 13.0,
					"id" : "obj-61",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 838.0, 345.0, 469.0, 21.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 800.0, 105.0, 469.0, 21.0 ],
					"text" : "GATES"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial Bold",
					"fontsize" : 13.0,
					"id" : "obj-60",
					"linecount" : 5,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 0.0, 430.0, 335.0, 81.0 ],
					"presentation" : 1,
					"presentation_linecount" : 2,
					"presentation_rect" : [ 0.0, 300.0, 801.0, 36.0 ],
					"text" : "To edit different tracks and patterns, click one of the \"TRAX\" or PATTERNS\" GUI buttons, or press the corresponding button on the Launchpad hardware. The top right 4 buttons control the current step value, and the grid turns steps on and off."
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial Bold",
					"fontsize" : 13.0,
					"id" : "obj-59",
					"linecount" : 4,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ -4.0, 128.0, 422.0, 66.0 ],
					"presentation" : 1,
					"presentation_linecount" : 2,
					"presentation_rect" : [ 0.0, 0.0, 774.0, 36.0 ],
					"text" : "This device is intended to be used with Novation Launchpad hardware MIDI controller. It has an on-screen GUI that mirrors the Launchpad hardware, and the device may be controlled entirely through the GUI without using Launchpad hardware."
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial Bold",
					"fontsize" : 13.0,
					"id" : "obj-58",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ -1.0, 386.0, 469.0, 21.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 0.0, 510.0, 469.0, 21.0 ],
					"text" : "MORE HELP"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial Bold",
					"fontsize" : 13.0,
					"id" : "obj-57",
					"linecount" : 4,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 0.0, 53.0, 423.0, 66.0 ],
					"presentation" : 1,
					"presentation_linecount" : 2,
					"presentation_rect" : [ 0.0, 60.0, 797.0, 36.0 ],
					"text" : "This device requires a secondary device to function. If you haven't already, add the launchpad-sequencer-proxy device to a new MIDI track. Then follow the instructions in that device to complete the setup."
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial Bold",
					"fontsize" : 13.0,
					"id" : "obj-56",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ -2.0, 24.0, 471.0, 21.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 0.0, 45.0, 471.0, 21.0 ],
					"text" : "SETUP"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial Bold",
					"fontsize" : 13.0,
					"id" : "obj-55",
					"linecount" : 5,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 2407.0, 191.0, 430.0, 81.0 ],
					"presentation" : 1,
					"presentation_linecount" : 3,
					"presentation_rect" : [ 3200.0, 480.0, 809.0, 51.0 ],
					"text" : "NOTE: As a performance optimization, the state of the sequencer is only saved when Live's transport is stopped. To avoid losing your sequence, make sure you stop the Live transport before you save your Live set. Alternately, you can click the \"save\" button inside the device to force it to save at any time."
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial Bold",
					"fontsize" : 18.0,
					"frgb" : [ 0.184314, 0.184314, 0.184314, 1.0 ],
					"id" : "obj-54",
					"linecount" : 5,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 2401.0, 208.0, 571.0, 110.0 ],
					"presentation" : 1,
					"presentation_linecount" : 4,
					"presentation_rect" : [ 3200.0, 210.0, 797.0, 89.0 ],
					"text" : "The safest way to produce a song with this device is to route its MIDI output to another track that hosts the target instrument. Then you may record this sequencer's MIDI into MIDI clips on the target track. Once you have generated the desired clips, disable this track and finish producing your song with the target track.",
					"textcolor" : [ 0.184314, 0.184314, 0.184314, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-53",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 536.0, 603.0, 41.0, 18.0 ],
					"text" : "set -1"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-52",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "bang" ],
					"patching_rect" : [ 535.0, 570.0, 60.0, 20.0 ],
					"text" : "loadbang"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial Bold",
					"fontsize" : 13.0,
					"id" : "obj-46",
					"linecount" : 4,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 2396.0, 85.0, 425.0, 66.0 ],
					"presentation" : 1,
					"presentation_linecount" : 2,
					"presentation_rect" : [ 3200.0, 90.0, 787.0, 36.0 ],
					"text" : "Unfortunately, even turning a knob in a VST plugin can cause timing problems. If you setup macros or automation with Live it may help? Otherwise, avoid adjusting instrument and effects while the sequencer is playing."
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial Bold",
					"fontsize" : 13.0,
					"id" : "obj-35",
					"linecount" : 4,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 2388.0, 47.0, 424.0, 66.0 ],
					"presentation" : 1,
					"presentation_linecount" : 2,
					"presentation_rect" : [ 3200.0, 45.0, 807.0, 36.0 ],
					"text" : "Avoid adding and removing devices and plugins while working with the sequencer. Any \"heavy\" operation in Live will cause this device's MIDI stream to temporarily fall behind (it should \"catch up\" though)."
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial Bold",
					"fontsize" : 13.0,
					"id" : "obj-34",
					"linecount" : 4,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 2367.0, 6.0, 424.0, 66.0 ],
					"presentation" : 1,
					"presentation_linecount" : 2,
					"presentation_rect" : [ 3200.0, 0.0, 802.0, 36.0 ],
					"text" : "This device is a \"proof of concept\" and cannot always maintain stable timing. I hope to make a VST version of thie device one day with rock-solid timing. In the meantime, here are some known issues and workarounds."
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial Bold",
					"fontsize" : 13.0,
					"id" : "obj-33",
					"linecount" : 2,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1593.0, 179.0, 425.0, 36.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 1600.0, 180.0, 797.0, 21.0 ],
					"text" : "You can use MIDI input to set the track's pitches, which allows for arpeggiator-like sequencing."
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial Bold",
					"fontsize" : 13.0,
					"id" : "obj-32",
					"linecount" : 9,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1595.0, 132.0, 474.0, 141.0 ],
					"presentation" : 1,
					"presentation_linecount" : 8,
					"presentation_rect" : [ 800.0, 285.0, 808.0, 126.0 ],
					"text" : "Recommended gate types for different music material:\n\n* Melodies => Scale Gate\n\n* Single pitch drum patterns (such as a kick drum pattern) => Velocity Gate\n\n* Multi-pitch drum patterns (such as kick + snare + toms) => Pitch Gate\n  ... and setup a Live Drum Rack with the desired drum sounds in consecutive slots"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial Bold",
					"fontsize" : 13.0,
					"id" : "obj-30",
					"linecount" : 4,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1599.0, 120.0, 470.0, 66.0 ],
					"presentation" : 1,
					"presentation_linecount" : 2,
					"presentation_rect" : [ 1600.0, 225.0, 802.0, 36.0 ],
					"text" : "Use a Live Instrument Rack with a keyboard split to control multiple synthesizers and/or drum machines from a single instance of this device. For example, each track may control a different 2-octave range. Or you can sequence drums along with a melody."
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial Bold",
					"fontsize" : 13.0,
					"id" : "obj-29",
					"linecount" : 2,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 804.0, 113.0, 460.0, 36.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 800.0, 525.0, 800.0, 21.0 ],
					"text" : "The remaining pattern types modify a note, if one was generated by a gate-type pattern earlier in the track."
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial Bold",
					"fontsize" : 13.0,
					"id" : "obj-28",
					"linecount" : 5,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 791.0, 190.0, 413.0, 81.0 ],
					"presentation" : 1,
					"presentation_linecount" : 3,
					"presentation_rect" : [ 800.0, 180.0, 801.0, 51.0 ],
					"text" : "When a gate pattern generates a note, the note's pitch and velocity settings come from the track settings. Each track can have different pitch and velocity settings. The gate determines the length of the note (depending on the particular pattern type), and the duration scaled by the tracks' duration setting."
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial Bold",
					"fontsize" : 13.0,
					"id" : "obj-27",
					"linecount" : 3,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 806.0, 189.0, 462.0, 51.0 ],
					"presentation" : 1,
					"presentation_linecount" : 2,
					"presentation_rect" : [ 800.0, 135.0, 818.0, 36.0 ],
					"text" : "The various gate pattern types generate a note. A track must have at least one gate-type pattern to generate any notes. Typically the gate is the first pattern in the track (pattern 1)."
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial Bold",
					"fontsize" : 13.0,
					"id" : "obj-17",
					"linecount" : 4,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1663.0, 2.0, 424.0, 66.0 ],
					"presentation" : 1,
					"presentation_linecount" : 2,
					"presentation_rect" : [ 1600.0, 0.0, 802.0, 36.0 ],
					"text" : "Change patterns' start and end step to create patterns of different lengths. Different lengths within a track can create \"phasing\"  patterns and avoid repetitive loops. Setting each track's gate pattern to a different length can create polyrhythms."
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial Bold",
					"fontsize" : 13.0,
					"id" : "obj-23",
					"linecount" : 4,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1663.0, 42.0, 331.0, 66.0 ],
					"presentation" : 1,
					"presentation_linecount" : 2,
					"presentation_rect" : [ 1600.0, 120.0, 797.0, 36.0 ],
					"text" : "Use the global scale and scale gate pattern types to make melodies and harmonies that fit your song's key. For best results, make sure each track's pitch is set to a pitch in the scale."
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial Bold",
					"fontsize" : 13.0,
					"id" : "obj-14",
					"linecount" : 3,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1570.0, 2.0, 408.0, 51.0 ],
					"presentation" : 1,
					"presentation_linecount" : 2,
					"presentation_rect" : [ 4000.0, 0.0, 793.0, 36.0 ],
					"text" : "MIDI notes can be used to remote control the step sequencer device. \nThe note's pitch determines how it affects the sequencer:"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial Bold",
					"fontsize" : 13.0,
					"id" : "obj-6",
					"linecount" : 4,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 798.0, 8.0, 355.0, 66.0 ],
					"presentation" : 1,
					"presentation_linecount" : 2,
					"presentation_rect" : [ 800.0, 0.0, 781.0, 36.0 ],
					"text" : "Below the pattern type drop-down in the GUI is a detailed description of the selected type's behavior. \nHere we discuss the general categories of pattern types."
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-49",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"patching_rect" : [ 400.0, 610.0, 43.0, 20.0 ],
					"text" : "* -800"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-74",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 400.0, 650.0, 66.0, 18.0 ],
					"text" : "offset $1 0"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-47",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"patching_rect" : [ 400.0, 680.0, 69.0, 20.0 ],
					"save" : [ "#N", "thispatcher", ";", "#Q", "end", ";" ],
					"text" : "thispatcher"
				}

			}
, 			{
				"box" : 				{
					"comment" : "",
					"id" : "obj-48",
					"maxclass" : "inlet",
					"numinlets" : 0,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 400.0, 570.0, 25.0, 25.0 ]
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-21",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 604.0, 238.0, 81.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 4493.0, 46.0, 67.0, 20.0 ],
					"text" : "C5 ... B5"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-18",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 214.0, 238.0, 47.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 4186.0, 50.0, 39.0, 20.0 ],
					"text" : "Ab0.."
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-13",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 294.0, 249.0, 71.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 4330.0, 109.0, 67.0, 20.0 ],
					"text" : "C1 ... B4"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-26",
					"linecount" : 4,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 599.0, 328.0, 180.0, 62.0 ],
					"presentation" : 1,
					"presentation_linecount" : 3,
					"presentation_rect" : [ 4264.0, 128.0, 217.0, 48.0 ],
					"text" : "set track base pitch \"round-robin\" (each note sets track pitch in a circular loop: set track 1,2,3,4,1,2,3,etc...) "
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-25",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 716.0, 250.0, 66.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 4634.0, 109.0, 62.0, 20.0 ],
					"text" : "C6 ... G8"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-24",
					"linecount" : 5,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 301.0, 329.0, 77.0, 75.0 ],
					"presentation" : 1,
					"presentation_linecount" : 5,
					"presentation_rect" : [ 4504.0, 110.0, 77.0, 75.0 ],
					"text" : "      V\n set scale.\nplay a chord to set the scale"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-20",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 85.0, 247.0, 79.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 4069.0, 109.0, 73.0, 20.0 ],
					"text" : "C -2 ... G0"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-19",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 423.0, 253.0, 39.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 4348.0, 50.0, 38.0, 20.0 ],
					"text" : "C3"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-36",
					"linecount" : 6,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 381.0, 319.0, 130.0, 89.0 ],
					"presentation" : 1,
					"presentation_linecount" : 5,
					"presentation_rect" : [ 4606.0, 126.0, 199.0, 75.0 ],
					"text" : "global transpose.\nC7 is \"center\", so you can transpose down by up to 1 octave, and transpose up by an octave and a half"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.164706, 0.607843, 0.117647, 0.403922 ],
					"id" : "obj-37",
					"maxclass" : "panel",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 714.0, 275.0, 71.0, 45.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 4635.0, 66.0, 71.0, 45.0 ]
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.164706, 0.607843, 0.117647, 0.403922 ],
					"id" : "obj-38",
					"maxclass" : "panel",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 574.0, 275.0, 71.0, 45.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 4495.0, 67.0, 71.0, 45.0 ]
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.164706, 0.607843, 0.117647, 0.403922 ],
					"id" : "obj-39",
					"maxclass" : "panel",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 434.0, 275.0, 71.0, 45.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 4355.0, 67.0, 71.0, 45.0 ]
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.164706, 0.607843, 0.117647, 0.403922 ],
					"id" : "obj-40",
					"maxclass" : "panel",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 294.0, 275.0, 71.0, 45.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 4215.0, 67.0, 71.0, 45.0 ]
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.164706, 0.607843, 0.117647, 0.403922 ],
					"id" : "obj-41",
					"maxclass" : "panel",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 154.0, 275.0, 71.0, 45.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 4075.0, 67.0, 71.0, 45.0 ]
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-42",
					"linecount" : 3,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 266.0, 319.0, 42.0, 48.0 ],
					"presentation" : 1,
					"presentation_linecount" : 3,
					"presentation_rect" : [ 4189.0, 110.0, 42.0, 48.0 ],
					"text" : "   V\nmute\ntrack"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-43",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 146.0, 325.0, 84.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 4059.0, 131.0, 84.0, 20.0 ],
					"text" : "mute pattern"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-44",
					"ignoreclick" : 1,
					"maxclass" : "kslider",
					"numinlets" : 2,
					"numoutlets" : 2,
					"offset" : 0,
					"outlettype" : [ "int", "int" ],
					"patching_rect" : [ 84.0, 275.0, 750.0, 45.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 4005.0, 67.0, 750.0, 45.0 ],
					"range" : 128
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-45",
					"maxclass" : "panel",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 85.0, 298.0, 190.0, 31.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 4006.0, 90.0, 190.0, 37.0 ],
					"rounded" : 36
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-8",
					"maxclass" : "panel",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 514.0, 300.0, 321.0, 29.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 4217.0, 95.0, 277.0, 32.0 ],
					"rounded" : 36
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-9",
					"maxclass" : "panel",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 295.0, 300.0, 70.0, 31.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 4566.0, 88.0, 187.0, 38.0 ],
					"rounded" : 36
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial Bold",
					"fontsize" : 13.0,
					"id" : "obj-16",
					"linecount" : 2,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 800.0, 20.0, 460.0, 36.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 800.0, 465.0, 794.0, 21.0 ],
					"text" : "The modulation and aftertouch pattern types generate CC messages for the MIDI modulation \"wheel\" and channel aftertouch."
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial Bold",
					"fontsize" : 13.0,
					"id" : "obj-12",
					"linecount" : 4,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 0.0, 310.0, 397.0, 66.0 ],
					"presentation" : 1,
					"presentation_linecount" : 2,
					"presentation_rect" : [ 0.0, 345.0, 794.0, 36.0 ],
					"text" : "The global step length determines the clock speed of the sequencer. \nWhen Live is playing, there will be one step length between each clock tick of the sequencer."
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial Bold",
					"fontsize" : 13.0,
					"id" : "obj-11",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 0.0, 90.0, 469.0, 21.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 0.0, 135.0, 469.0, 21.0 ],
					"text" : "BASIC CONCEPTS"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial Bold",
					"fontsize" : 13.0,
					"id" : "obj-10",
					"linecount" : 2,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 0.0, 30.0, 419.0, 36.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 0.0, 525.0, 801.0, 21.0 ],
					"text" : "Open Live's Info View (in the lower left of Live) to see an explanation of each feature of the GUI when you hover the mouse."
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial Bold",
					"fontsize" : 13.0,
					"id" : "obj-7",
					"linecount" : 2,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 0.0, 420.0, 335.0, 36.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 0.0, 435.0, 638.0, 21.0 ],
					"text" : "The pattern's type determines how its step values produce or modify a MIDI message."
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial Bold",
					"fontsize" : 13.0,
					"id" : "obj-5",
					"linecount" : 3,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 0.0, 370.0, 479.0, 51.0 ],
					"presentation" : 1,
					"presentation_linecount" : 2,
					"presentation_rect" : [ 0.0, 390.0, 793.0, 36.0 ],
					"text" : "On a clock tick, each track independently generates MIDI messages (notes and/or CC) by applying its 8 patterns' current step values, in order from pattern 1 to pattern 8  (top to bottom in the GUI)."
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial Bold",
					"fontsize" : 13.0,
					"id" : "obj-4",
					"linecount" : 2,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 0.0, 280.0, 465.0, 36.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 0.0, 270.0, 791.0, 21.0 ],
					"text" : "Patterns are grouped together into 4 tracks. Each track has 8 patterns, numbered 1 through 8."
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial Bold",
					"fontsize" : 13.0,
					"id" : "obj-3",
					"linecount" : 2,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 0.0, 190.0, 688.0, 36.0 ],
					"presentation" : 1,
					"presentation_linecount" : 2,
					"presentation_rect" : [ 0.0, 225.0, 791.0, 36.0 ],
					"text" : "Each step has a value of either 0, 1, 2, 3, or 4. \nThe value determine the step's color: 0 is off (gray), 1 is green, 2 is yellow, 3 is orange, 4 is red."
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial Bold",
					"fontsize" : 13.0,
					"id" : "obj-2",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 0.0, 160.0, 462.0, 21.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 0.0, 195.0, 757.0, 21.0 ],
					"text" : "Each pattern has up to 64 steps. "
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial Bold",
					"fontsize" : 13.0,
					"id" : "obj-1",
					"linecount" : 2,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 0.0, 120.0, 422.0, 36.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 0.0, 165.0, 758.0, 21.0 ],
					"text" : "This device generates MIDI notes and CC (control) messages from 32 different step sequencer patterns."
				}

			}
 ],
		"lines" : [ 			{
				"patchline" : 				{
					"destination" : [ "obj-49", 0 ],
					"hidden" : 0,
					"midpoints" : [  ],
					"source" : [ "obj-48", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-74", 0 ],
					"hidden" : 0,
					"midpoints" : [  ],
					"source" : [ "obj-49", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-53", 0 ],
					"hidden" : 0,
					"midpoints" : [  ],
					"source" : [ "obj-52", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-44", 0 ],
					"hidden" : 0,
					"midpoints" : [  ],
					"source" : [ "obj-53", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-47", 0 ],
					"hidden" : 0,
					"midpoints" : [  ],
					"source" : [ "obj-74", 0 ]
				}

			}
 ]
	}

}
