{
	"patcher" : 	{
		"fileversion" : 1,
		"appversion" : 		{
			"major" : 8,
			"minor" : 0,
			"revision" : 2,
			"architecture" : "x64",
			"modernui" : 1
		}
,
		"classnamespace" : "box",
		"rect" : [ 336.0, 321.0, 599.0, 631.0 ],
		"bglocked" : 0,
		"openinpresentation" : 0,
		"default_fontsize" : 12.0,
		"default_fontface" : 0,
		"default_fontname" : "Arial",
		"gridonopen" : 1,
		"gridsize" : [ 15.0, 15.0 ],
		"gridsnaponopen" : 1,
		"objectsnaponopen" : 1,
		"statusbarvisible" : 2,
		"toolbarvisible" : 1,
		"lefttoolbarpinned" : 0,
		"toptoolbarpinned" : 0,
		"righttoolbarpinned" : 0,
		"bottomtoolbarpinned" : 0,
		"toolbars_unpinned_last_save" : 0,
		"tallnewobj" : 0,
		"boxanimatetime" : 200,
		"enablehscroll" : 1,
		"enablevscroll" : 1,
		"devicewidth" : 0.0,
		"description" : "",
		"digest" : "",
		"tags" : "",
		"style" : "",
		"subpatcher_template" : "",
		"boxes" : [ 			{
				"box" : 				{
					"id" : "obj-8",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"patching_rect" : [ 288.0, 120.0, 33.0, 22.0 ],
					"text" : "grab"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-7",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"patching_rect" : [ 168.0, 120.0, 33.0, 22.0 ],
					"text" : "grab"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-6",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "", "", "" ],
					"patching_rect" : [ 302.0, 200.0, 64.0, 22.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_initial" : [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ],
							"parameter_initial_enable" : 1,
							"parameter_invisible" : 1,
							"parameter_longname" : "scale",
							"parameter_shortname" : "scale",
							"parameter_type" : 3
						}

					}
,
					"saved_object_attributes" : 					{
						"initial" : [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ],
						"parameter_enable" : 1,
						"parameter_mappable" : 0
					}
,
					"text" : "pattr scale",
					"varname" : "scale"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-4",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 6,
					"outlettype" : [ "bang", "bang", "bang", "bang", "bang", "bang" ],
					"patching_rect" : [ 408.0, 120.0, 72.0, 22.0 ],
					"text" : "t b b b b b b"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-5",
					"maxclass" : "newobj",
					"numinlets" : 5,
					"numoutlets" : 5,
					"outlettype" : [ "", "", "", "", "" ],
					"patching_rect" : [ 48.0, 76.0, 499.0, 22.0 ],
					"text" : "route tracks duration scale bang"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-18",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 372.918609619140625, 432.0, 98.0, 22.0 ],
					"text" : "prepend tracks 3"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-17",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 264.951141357421875, 432.0, 98.0, 22.0 ],
					"text" : "prepend tracks 2"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-16",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 156.475570678710938, 432.0, 98.0, 22.0 ],
					"text" : "prepend tracks 1"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-15",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 48.0, 432.0, 98.0, 22.0 ],
					"text" : "prepend tracks 0"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-14",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 182.0, 243.0, 99.0, 22.0 ],
					"text" : "prepend duration"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-13",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 302.0, 243.0, 84.0, 22.0 ],
					"text" : "prepend scale"
				}

			}
, 			{
				"box" : 				{
					"comment" : "",
					"id" : "obj-3",
					"index" : 0,
					"maxclass" : "outlet",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 517.0, 573.0, 30.0, 30.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-2",
					"maxclass" : "newobj",
					"numinlets" : 5,
					"numoutlets" : 5,
					"outlettype" : [ "", "", "", "", "" ],
					"patching_rect" : [ 48.0, 352.0, 452.90228271484375, 22.0 ],
					"text" : "route 0 1 2 3"
				}

			}
, 			{
				"box" : 				{
					"comment" : "",
					"id" : "obj-1",
					"index" : 0,
					"maxclass" : "inlet",
					"numinlets" : 0,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 48.0, 20.0, 30.0, 30.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-94",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "", "", "" ],
					"patching_rect" : [ 182.0, 200.0, 79.0, 22.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "128th", "64th", "64th dotted", "32nd triplet", "32nd", "32nd dotted", "16th triplet", "16th", "16th dotted", "eighth triplet", "eighth", "eighth dotted", "quarter triplet", "quarter", "quarter dotted", "half triplet", "half", "half dotted", "whole triplet", "whole", "whole dotted" ],
							"parameter_initial" : [ "16th" ],
							"parameter_initial_enable" : 1,
							"parameter_invisible" : 1,
							"parameter_longname" : "duration",
							"parameter_shortname" : "duration",
							"parameter_type" : 3
						}

					}
,
					"saved_object_attributes" : 					{
						"initial" : [ "16th" ],
						"parameter_enable" : 1,
						"parameter_mappable" : 0
					}
,
					"text" : "pattr duration",
					"varname" : "duration"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-42",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 372.918609619140625, 392.0, 72.0, 22.0 ],
					"text" : "track 3",
					"varname" : "tracks[3]"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-37",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 264.951141357421875, 392.0, 72.0, 22.0 ],
					"text" : "track 2",
					"varname" : "tracks[2]"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-35",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 156.475570678710938, 392.0, 72.0, 22.0 ],
					"text" : "track 1",
					"varname" : "tracks[1]"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-121",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 48.0, 392.0, 72.0, 22.0 ],
					"text" : "track 0",
					"varname" : "tracks[0]"
				}

			}
 ],
		"lines" : [ 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 0 ],
					"source" : [ "obj-1", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-15", 0 ],
					"source" : [ "obj-121", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-3", 0 ],
					"midpoints" : [ 311.5, 321.0, 526.5, 321.0 ],
					"source" : [ "obj-13", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-3", 0 ],
					"midpoints" : [ 191.5, 321.0, 526.5, 321.0 ],
					"source" : [ "obj-14", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-3", 0 ],
					"source" : [ "obj-15", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-3", 0 ],
					"source" : [ "obj-16", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-3", 0 ],
					"source" : [ "obj-17", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-3", 0 ],
					"source" : [ "obj-18", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-121", 0 ],
					"source" : [ "obj-2", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-35", 0 ],
					"source" : [ "obj-2", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-37", 0 ],
					"source" : [ "obj-2", 2 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-42", 0 ],
					"source" : [ "obj-2", 3 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-16", 0 ],
					"source" : [ "obj-35", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-17", 0 ],
					"source" : [ "obj-37", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"color" : [ 0.701961, 0.701961, 0.701961, 1.0 ],
					"destination" : [ "obj-121", 0 ],
					"source" : [ "obj-4", 3 ]
				}

			}
, 			{
				"patchline" : 				{
					"color" : [ 0.701961, 0.701961, 0.701961, 1.0 ],
					"destination" : [ "obj-35", 0 ],
					"source" : [ "obj-4", 2 ]
				}

			}
, 			{
				"patchline" : 				{
					"color" : [ 0.701961, 0.701961, 0.701961, 1.0 ],
					"destination" : [ "obj-37", 0 ],
					"source" : [ "obj-4", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"color" : [ 0.701961, 0.701961, 0.701961, 1.0 ],
					"destination" : [ "obj-42", 0 ],
					"source" : [ "obj-4", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"color" : [ 0.701961, 0.701961, 0.701961, 1.0 ],
					"destination" : [ "obj-6", 0 ],
					"source" : [ "obj-4", 4 ]
				}

			}
, 			{
				"patchline" : 				{
					"color" : [ 0.701961, 0.701961, 0.701961, 1.0 ],
					"destination" : [ "obj-94", 0 ],
					"source" : [ "obj-4", 5 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-18", 0 ],
					"source" : [ "obj-42", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-2", 0 ],
					"source" : [ "obj-5", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-4", 0 ],
					"source" : [ "obj-5", 3 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-7", 0 ],
					"source" : [ "obj-5", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-8", 0 ],
					"source" : [ "obj-5", 2 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-13", 0 ],
					"source" : [ "obj-6", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-94", 0 ],
					"source" : [ "obj-7", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-6", 0 ],
					"source" : [ "obj-8", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-14", 0 ],
					"source" : [ "obj-94", 0 ]
				}

			}
 ],
		"parameters" : 		{
			"obj-42::obj-1::obj-24" : [ "end", "end", 0 ],
			"obj-42::obj-11::obj-24" : [ "end[48]", "end", 0 ],
			"obj-121::obj-10::obj-22" : [ "start[97]", "start", 0 ],
			"obj-121::obj-11::obj-33" : [ "mute[10]", "mute", 0 ],
			"obj-35::obj-3::obj-22" : [ "start[87]", "start", 0 ],
			"obj-42::obj-54" : [ "gate[8]", "gate", 0 ],
			"obj-37::obj-12::obj-33" : [ "mute[106]", "mute", 0 ],
			"obj-6" : [ "scale", "scale", 0 ],
			"obj-42::obj-11::obj-22" : [ "start[5]", "start", 0 ],
			"obj-121::obj-52" : [ "mute[115]", "mute", 0 ],
			"obj-42::obj-9::obj-24" : [ "end[46]", "end", 0 ],
			"obj-42::obj-9::obj-33" : [ "mute[83]", "mute", 0 ],
			"obj-42::obj-11::obj-2" : [ "steps[43]", "steps", 0 ],
			"obj-121::obj-2::obj-22" : [ "start[93]", "start", 0 ],
			"obj-121::obj-10::obj-33" : [ "mute[113]", "mute", 0 ],
			"obj-35::obj-54" : [ "gate[9]", "gate", 0 ],
			"obj-37::obj-1::obj-33" : [ "mute[104]", "mute", 0 ],
			"obj-37::obj-3::obj-2" : [ "steps[5]", "steps", 0 ],
			"obj-37::obj-3::obj-33" : [ "mute[2]", "mute", 0 ],
			"obj-42::obj-2::obj-24" : [ "end[43]", "end", 0 ],
			"obj-42::obj-12::obj-22" : [ "start[6]", "start", 0 ],
			"obj-121::obj-3::obj-22" : [ "start[94]", "start", 0 ],
			"obj-35::obj-56" : [ "pitch[9]", "pitch", 0 ],
			"obj-37::obj-56" : [ "pitch[6]", "pitch", 0 ],
			"obj-42::obj-4::obj-22" : [ "start[2]", "start", 0 ],
			"obj-121::obj-11::obj-22" : [ "start[98]", "start", 0 ],
			"obj-35::obj-10::obj-2" : [ "steps[65]", "steps", 0 ],
			"obj-37::obj-9::obj-2" : [ "steps[7]", "steps", 0 ],
			"obj-35::obj-53" : [ "multiplier[9]", "multiplier", 0 ],
			"obj-42::obj-4::obj-2" : [ "steps[2]", "steps", 0 ],
			"obj-37::obj-3::obj-22" : [ "start[83]", "start", 0 ],
			"obj-37::obj-9::obj-22" : [ "start[7]", "start", 0 ],
			"obj-37::obj-11::obj-33" : [ "mute[105]", "mute", 0 ],
			"obj-42::obj-1::obj-22" : [ "start", "start", 0 ],
			"obj-42::obj-55" : [ "velocity[8]", "velocity", 0 ],
			"obj-121::obj-2::obj-24" : [ "end[66]", "end", 0 ],
			"obj-42::obj-4::obj-24" : [ "end[45]", "end", 0 ],
			"obj-121::obj-4::obj-24" : [ "end[41]", "end", 0 ],
			"obj-121::obj-10::obj-24" : [ "end[68]", "end", 0 ],
			"obj-37::obj-11::obj-2" : [ "steps[34]", "steps", 0 ],
			"obj-42::obj-2::obj-22" : [ "start[79]", "start", 0 ],
			"obj-37::obj-1::obj-2" : [ "steps[32]", "steps", 0 ],
			"obj-37::obj-11::obj-22" : [ "start[9]", "start", 0 ],
			"obj-42::obj-2::obj-33" : [ "mute[99]", "mute", 0 ],
			"obj-35::obj-4::obj-33" : [ "mute[5]", "mute", 0 ],
			"obj-121::obj-55" : [ "velocity", "velocity", 0 ],
			"obj-121::obj-9::obj-24" : [ "end[42]", "end", 0 ],
			"obj-35::obj-2::obj-33" : [ "mute[4]", "mute", 0 ],
			"obj-35::obj-12::obj-22" : [ "start[92]", "start", 0 ],
			"obj-37::obj-2::obj-22" : [ "start[82]", "start", 0 ],
			"obj-121::obj-56" : [ "pitch", "pitch", 0 ],
			"obj-37::obj-53" : [ "multiplier[6]", "multiplier", 0 ],
			"obj-121::obj-2::obj-2" : [ "steps[20]", "steps", 0 ],
			"obj-35::obj-3::obj-33" : [ "mute[108]", "mute", 0 ],
			"obj-35::obj-4::obj-2" : [ "steps[8]", "steps", 0 ],
			"obj-121::obj-1::obj-24" : [ "end[39]", "end", 0 ],
			"obj-121::obj-9::obj-33" : [ "mute[9]", "mute", 0 ],
			"obj-35::obj-9::obj-24" : [ "end[62]", "end", 0 ],
			"obj-37::obj-11::obj-24" : [ "end[56]", "end", 0 ],
			"obj-42::obj-56" : [ "pitch[8]", "pitch", 0 ],
			"obj-37::obj-9::obj-33" : [ "mute[85]", "mute", 0 ],
			"obj-37::obj-10::obj-22" : [ "start[8]", "start", 0 ],
			"obj-121::obj-12::obj-24" : [ "end[70]", "end", 0 ],
			"obj-35::obj-10::obj-24" : [ "end[63]", "end", 0 ],
			"obj-121::obj-4::obj-33" : [ "mute[112]", "mute", 0 ],
			"obj-121::obj-4::obj-2" : [ "steps[40]", "steps", 0 ],
			"obj-35::obj-1::obj-22" : [ "start[85]", "start", 0 ],
			"obj-35::obj-2::obj-24" : [ "end[59]", "end", 0 ],
			"obj-121::obj-4::obj-22" : [ "start[95]", "start", 0 ],
			"obj-37::obj-1::obj-24" : [ "end[50]", "end", 0 ],
			"obj-42::obj-1::obj-2" : [ "steps", "steps", 0 ],
			"obj-42::obj-10::obj-22" : [ "start[4]", "start", 0 ],
			"obj-121::obj-1::obj-33" : [ "mute[96]", "mute", 0 ],
			"obj-121::obj-12::obj-33" : [ "mute[114]", "mute", 0 ],
			"obj-35::obj-1::obj-33" : [ "mute[77]", "mute", 0 ],
			"obj-37::obj-12::obj-2" : [ "steps[35]", "steps", 0 ],
			"obj-42::obj-2::obj-2" : [ "steps[30]", "steps", 0 ],
			"obj-42::obj-4::obj-33" : [ "mute[81]", "mute", 0 ],
			"obj-121::obj-3::obj-33" : [ "mute[8]", "mute", 0 ],
			"obj-35::obj-2::obj-2" : [ "steps[37]", "steps", 0 ],
			"obj-35::obj-11::obj-22" : [ "start[91]", "start", 0 ],
			"obj-37::obj-3::obj-24" : [ "end[52]", "end", 0 ],
			"obj-121::obj-1::obj-2" : [ "steps[45]", "steps", 0 ],
			"obj-37::obj-10::obj-33" : [ "mute[87]", "mute", 0 ],
			"obj-42::obj-3::obj-24" : [ "end[44]", "end", 0 ],
			"obj-94" : [ "duration", "duration", 0 ],
			"obj-37::obj-2::obj-33" : [ "mute[1]", "mute", 0 ],
			"obj-42::obj-11::obj-33" : [ "mute[102]", "mute", 0 ],
			"obj-35::obj-11::obj-24" : [ "end[64]", "end", 0 ],
			"obj-37::obj-54" : [ "gate[6]", "gate", 0 ],
			"obj-42::obj-9::obj-22" : [ "start[3]", "start", 0 ],
			"obj-42::obj-52" : [ "mute[33]", "mute", 0 ],
			"obj-121::obj-54" : [ "gate", "gate", 0 ],
			"obj-35::obj-3::obj-24" : [ "end[60]", "end", 0 ],
			"obj-35::obj-4::obj-22" : [ "start[88]", "start", 0 ],
			"obj-35::obj-9::obj-2" : [ "steps[64]", "steps", 0 ],
			"obj-37::obj-4::obj-2" : [ "steps[6]", "steps", 0 ],
			"obj-42::obj-10::obj-33" : [ "mute[101]", "mute", 0 ],
			"obj-37::obj-10::obj-2" : [ "steps[69]", "steps", 0 ],
			"obj-42::obj-53" : [ "multiplier[8]", "multiplier", 0 ],
			"obj-121::obj-11::obj-2" : [ "steps[67]", "steps", 0 ],
			"obj-35::obj-55" : [ "velocity[9]", "velocity", 0 ],
			"obj-37::obj-4::obj-24" : [ "end[53]", "end", 0 ],
			"obj-121::obj-9::obj-2" : [ "steps[9]", "steps", 0 ],
			"obj-35::obj-10::obj-22" : [ "start[90]", "start", 0 ],
			"obj-35::obj-12::obj-2" : [ "steps[23]", "steps", 0 ],
			"obj-35::obj-9::obj-33" : [ "mute[109]", "mute", 0 ],
			"obj-35::obj-10::obj-33" : [ "mute[110]", "mute", 0 ],
			"obj-35::obj-12::obj-33" : [ "mute[89]", "mute", 0 ],
			"obj-121::obj-3::obj-24" : [ "end[67]", "end", 0 ],
			"obj-37::obj-2::obj-24" : [ "end[51]", "end", 0 ],
			"obj-37::obj-12::obj-24" : [ "end[57]", "end", 0 ],
			"obj-121::obj-11::obj-24" : [ "end[69]", "end", 0 ],
			"obj-42::obj-3::obj-2" : [ "steps[31]", "steps", 0 ],
			"obj-42::obj-10::obj-2" : [ "steps[4]", "steps", 0 ],
			"obj-42::obj-12::obj-24" : [ "end[49]", "end", 0 ],
			"obj-37::obj-4::obj-33" : [ "mute[3]", "mute", 0 ],
			"obj-35::obj-9::obj-22" : [ "start[89]", "start", 0 ],
			"obj-42::obj-9::obj-2" : [ "steps[3]", "steps", 0 ],
			"obj-42::obj-10::obj-24" : [ "end[47]", "end", 0 ],
			"obj-121::obj-12::obj-22" : [ "start[99]", "start", 0 ],
			"obj-35::obj-11::obj-2" : [ "steps[66]", "steps", 0 ],
			"obj-35::obj-4::obj-24" : [ "end[61]", "end", 0 ],
			"obj-35::obj-11::obj-33" : [ "mute[6]", "mute", 0 ],
			"obj-35::obj-52" : [ "mute[111]", "mute", 0 ],
			"obj-42::obj-12::obj-33" : [ "mute[103]", "mute", 0 ],
			"obj-37::obj-4::obj-22" : [ "start[84]", "start", 0 ],
			"obj-121::obj-10::obj-2" : [ "steps[10]", "steps", 0 ],
			"obj-37::obj-1::obj-22" : [ "start[81]", "start", 0 ],
			"obj-37::obj-9::obj-24" : [ "end[54]", "end", 0 ],
			"obj-37::obj-52" : [ "mute[107]", "mute", 0 ],
			"obj-42::obj-3::obj-22" : [ "start[80]", "start", 0 ],
			"obj-35::obj-3::obj-2" : [ "steps[38]", "steps", 0 ],
			"obj-37::obj-2::obj-2" : [ "steps[33]", "steps", 0 ],
			"obj-42::obj-3::obj-33" : [ "mute[100]", "mute", 0 ],
			"obj-121::obj-2::obj-33" : [ "mute[7]", "mute", 0 ],
			"obj-35::obj-1::obj-24" : [ "end[58]", "end", 0 ],
			"obj-35::obj-1::obj-2" : [ "steps[36]", "steps", 0 ],
			"obj-121::obj-3::obj-2" : [ "steps[39]", "steps", 0 ],
			"obj-121::obj-1::obj-22" : [ "start[77]", "start", 0 ],
			"obj-121::obj-9::obj-22" : [ "start[96]", "start", 0 ],
			"obj-121::obj-12::obj-2" : [ "steps[70]", "steps", 0 ],
			"obj-121::obj-53" : [ "multiplier", "multiplier", 0 ],
			"obj-37::obj-55" : [ "velocity[6]", "velocity", 0 ],
			"obj-37::obj-10::obj-24" : [ "end[55]", "end", 0 ],
			"obj-37::obj-12::obj-22" : [ "start[10]", "start", 0 ],
			"obj-42::obj-12::obj-2" : [ "steps[44]", "steps", 0 ],
			"obj-35::obj-2::obj-22" : [ "start[86]", "start", 0 ],
			"obj-35::obj-12::obj-24" : [ "end[65]", "end", 0 ],
			"obj-42::obj-1::obj-33" : [ "mute", "mute", 0 ],
			"parameterbanks" : 			{

			}

		}
,
		"dependency_cache" : [ 			{
				"name" : "track.maxpat",
				"bootpath" : "D:/workspace/Max/Max-for-Live/m4l-launchpad-sequencer/launchpad-sequencer/launchpad-sequencer-device-project",
				"patcherrelativepath" : ".",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "pattern.maxpat",
				"bootpath" : "D:/workspace/Max/Max-for-Live/m4l-launchpad-sequencer/launchpad-sequencer/launchpad-sequencer-device-project",
				"patcherrelativepath" : ".",
				"type" : "JSON",
				"implicit" : 1
			}
 ],
		"autosave" : 0
	}

}
